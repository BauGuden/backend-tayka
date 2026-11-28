import { Injectable, NotFoundException } from '@nestjs/common';
import { In, LessThanOrEqual, MoreThan } from 'typeorm';
import {
  productoPublico,
  proveedorPublico,
} from '../../catalog/services/catalog.service';
import { DatabaseService } from '../../geography/services/database.service';
import {
  PageQuery,
  ReadModelService,
  selectFields,
  pickFields,
} from '../../geography/services/read-model.service';
import {
  DestinoOferta,
  GrupoCompra,
  Oferta,
  ParticipanteGrupo,
} from '../entities';

const OFERTA = [
  'id',
  'proveedorId',
  'varianteId',
  'titulo',
  'descripcionCondiciones',
  'codigoMoneda',
  'precioUnitario',
  'precioMinoristaReferencia',
  'cantidadMinimaPedido',
  'minimoCompradores',
  'cantidadMaxima',
  'vigenteDesde',
  'vigenteHasta',
  'condicionesGarantia',
  'condicionesDevolucion',
] as const;
const GRUPO = [
  'id',
  'ofertaId',
  'codigoGrupo',
  'estado',
  'cantidadMinimaFijada',
  'minimoCompradoresFijado',
  'precioFijado',
  'codigoMoneda',
  'plazoAdhesion',
  'plazoPago',
] as const;
const BATCH_SIZE = 100;

export function ofertaPublica(now: Date) {
  return {
    estado: 'activo',
    vigenteDesde: LessThanOrEqual(now),
    vigenteHasta: MoreThan(now),
    proveedor: proveedorPublico(),
    variante: { estaActivo: true, producto: productoPublico() },
  };
}

export function gruposPublicos(now: Date) {
  const oferta = ofertaPublica(now);
  return [
    { oferta, estado: 'abierto', plazoAdhesion: MoreThan(now) },
    { oferta, estado: 'pago_abierto', plazoPago: MoreThan(now) },
  ];
}

@Injectable()
export class CommerceService {
  constructor(
    private readonly reads: ReadModelService,
    private readonly database: DatabaseService,
  ) {}

  async ofertas(
    page: PageQuery,
    {
      ciudadId,
      varianteId,
      proveedorId,
    }: { ciudadId?: string; varianteId?: string; proveedorId?: string },
  ) {
    const where = {
      ...ofertaPublica(new Date()),
      ...(varianteId && { varianteId }),
      ...(proveedorId && { proveedorId }),
    };
    if (!ciudadId) return this.reads.list(Oferta, OFERTA, page, where);
    return this.database.read(Oferta, (repository) =>
      repository.manager.transaction('REPEATABLE READ', async (manager) => {
        const destinos = manager.getRepository(DestinoOferta);
        const take = page.limit ?? 20;
        const skip = ((page.page ?? 1) - 1) * take;
        const ids: string[] = [];
        let previous: string | undefined;
        let distinct = 0;
        // Oferta has no inverse relation to destinations. Read consecutive destination batches
        // in one snapshot and paginate distinct offer IDs, not delivery modes.
        while (ids.length < take) {
          const batch = await destinos.find({
            select: { id: true, ofertaId: true },
            where: {
              ciudadId,
              estaHabilitado: true,
              oferta: where,
              ...(previous && { ofertaId: MoreThan(previous) }),
            },
            order: { ofertaId: 'ASC', id: 'ASC' },
            take: BATCH_SIZE,
          });
          for (const { ofertaId } of batch) {
            if (ofertaId === previous) continue;
            previous = ofertaId;
            if (distinct++ >= skip) ids.push(ofertaId);
            if (ids.length === take) break;
          }
          if (batch.length < BATCH_SIZE) break;
        }
        if (!ids.length) return [];
        const offers = await manager.getRepository(Oferta).find({
          select: selectFields<Oferta>(OFERTA),
          where: { id: In(ids) },
          order: { id: 'ASC' },
        });
        return offers.map((offer) => pickFields(offer, OFERTA));
      }),
    );
  }

  oferta(id: string) {
    return this.reads.detail(Oferta, OFERTA, {
      id,
      ...ofertaPublica(new Date()),
    });
  }

  async destinos(ofertaId: string, page: PageQuery) {
    await this.oferta(ofertaId);
    return this.reads.list(
      DestinoOferta,
      ['id', 'ciudadId', 'modalidadEntrega', 'costoEnvioEstimado'],
      page,
      {
        ofertaId,
        estaHabilitado: true,
        oferta: ofertaPublica(new Date()),
      },
    );
  }

  grupos(page: PageQuery) {
    return this.reads.list(
      GrupoCompra,
      GRUPO,
      page,
      gruposPublicos(new Date()),
    );
  }

  grupo(id: string) {
    return this.reads.detail(
      GrupoCompra,
      GRUPO,
      gruposPublicos(new Date()).map((where) => ({ ...where, id })),
    );
  }

  progreso(id: string) {
    return this.database.read(GrupoCompra, (repository) =>
      repository.manager.transaction('REPEATABLE READ', async (manager) => {
        const group = await manager.getRepository(GrupoCompra).findOne({
          select: {
            id: true,
            cantidadMinimaFijada: true,
            minimoCompradoresFijado: true,
          },
          where: gruposPublicos(new Date()).map((where) => ({ ...where, id })),
        });
        if (!group) throw new NotFoundException('Recurso no encontrado');

        const participantes = manager.getRepository(ParticipanteGrupo);
        let lastId: string | undefined;
        let mil = 0n;
        let compradores = 0n;
        while (true) {
          const batch = await participantes.find({
            select: { id: true, cantidad: true },
            where: {
              grupoId: id,
              estado: 'activo',
              ...(lastId && { id: MoreThan(lastId) }),
            },
            order: { id: 'ASC' },
            take: BATCH_SIZE,
          });
          for (const { cantidad } of batch) {
            const [whole, fraction = ''] = cantidad.split('.');
            mil += BigInt(whole) * 1000n + BigInt(fraction.padEnd(3, '0'));
            compradores += 1n; // The group/user UNIQUE guarantees one row per buyer.
          }
          if (batch.length < BATCH_SIZE) break;
          lastId = batch[batch.length - 1].id;
        }
        return {
          grupoId: id,
          cantidadMinima: group.cantidadMinimaFijada,
          minimoCompradores: group.minimoCompradoresFijado,
          cantidad:
            (mil / 1000n).toString() +
            '.' +
            (mil % 1000n).toString().padStart(3, '0'),
          compradores: compradores.toString(),
        };
      }),
    );
  }
}
