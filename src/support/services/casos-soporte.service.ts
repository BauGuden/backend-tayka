import { Injectable } from '@nestjs/common';
import { CasoSoporte, MensajeSoporte } from '../entities';
import {
  PageQuery,
  ReadModelService,
} from '../../geography/services/read-model.service';

const CASO = [
  'id',
  'asunto',
  'categoria',
  'prioridad',
  'estado',
  'creadoEn',
  'cerradoEn',
] as const;

@Injectable()
export class CasosSoporteService {
  constructor(private readonly reads: ReadModelService) {}

  propios(usuarioId: string, page: PageQuery) {
    return this.reads.list(
      CasoSoporte,
      CASO,
      page,
      { usuarioCreadorId: usuarioId },
      { creadoEn: 'ASC', id: 'ASC' },
    );
  }

  detallePropio(usuarioId: string, casoId: string) {
    return this.reads.detail(CasoSoporte, CASO, {
      id: casoId,
      usuarioCreadorId: usuarioId,
    });
  }

  mensajesPublicosDelCaso(usuarioId: string, casoId: string, page: PageQuery) {
    return this.reads.list(
      MensajeSoporte,
      ['id', 'contenido', 'urlAdjunto', 'creadoEn'],
      page,
      {
        casoSoporteId: casoId,
        esNotaInterna: false,
        casoSoporte: { usuarioCreadorId: usuarioId },
      },
      { creadoEn: 'ASC', id: 'ASC' },
    );
  }
}
