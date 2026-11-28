import { BadRequestException, Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import {
  productoPublico,
  proveedorPublico,
} from '../../catalog/services/catalog.service';
import {
  gruposPublicos,
  ofertaPublica,
} from '../../commerce/services/commerce.service';
import {
  PageQuery,
  ReadModelService,
} from '../../geography/services/read-model.service';
import { Comentario, Resena } from '../entities';

type DestinoComentario = {
  productoId?: string;
  ofertaId?: string;
  grupoId?: string;
};
type DestinoResena = { productoId?: string; proveedorId?: string };
const COMENTARIO = [
  'id',
  'productoId',
  'ofertaId',
  'grupoId',
  'contenido',
  'creadoEn',
] as const;
const RESENA = [
  'id',
  'productoId',
  'proveedorId',
  'calificacion',
  'titulo',
  'contenido',
  'creadoEn',
] as const;

function comentarioVisible(
  now: Date,
  { productoId, ofertaId, grupoId }: DestinoComentario = {},
) {
  const visible = { estado: 'visible', eliminadoEn: IsNull() };
  if (productoId)
    return [{ ...visible, productoId, producto: productoPublico() }];
  if (ofertaId) return [{ ...visible, ofertaId, oferta: ofertaPublica(now) }];
  const groups = gruposPublicos(now).map((grupo) => ({
    ...visible,
    ...(grupoId && { grupoId }),
    grupo,
  }));
  if (grupoId) return groups;
  return [
    { ...visible, producto: productoPublico() },
    { ...visible, oferta: ofertaPublica(now) },
    ...groups,
  ];
}

@Injectable()
export class CommunityService {
  constructor(private readonly reads: ReadModelService) {}

  comentarios(page: PageQuery, destino: DestinoComentario) {
    if (
      [destino.productoId, destino.ofertaId, destino.grupoId].filter(Boolean)
        .length !== 1
    ) {
      throw new BadRequestException('Indica exactamente un destino');
    }
    return this.reads.list(
      Comentario,
      COMENTARIO,
      page,
      comentarioVisible(new Date(), destino),
    );
  }

  comentario(id: string) {
    return this.reads.detail(
      Comentario,
      COMENTARIO,
      comentarioVisible(new Date()).map((where) => ({ ...where, id })),
    );
  }

  resenas(page: PageQuery, { productoId, proveedorId }: DestinoResena) {
    if ([productoId, proveedorId].filter(Boolean).length !== 1) {
      throw new BadRequestException('Indica exactamente un destino');
    }
    return this.reads.list(
      Resena,
      RESENA,
      page,
      productoId
        ? { estado: 'visible', productoId, producto: productoPublico() }
        : { estado: 'visible', proveedorId, proveedor: proveedorPublico() },
    );
  }

  resena(id: string) {
    const visible = { id, estado: 'visible' };
    return this.reads.detail(Resena, RESENA, [
      { ...visible, producto: productoPublico() },
      { ...visible, proveedor: proveedorPublico() },
    ]);
  }
}
