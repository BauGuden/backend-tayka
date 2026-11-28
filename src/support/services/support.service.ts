import { Injectable } from '@nestjs/common';
import { CasosSoporteService } from './casos-soporte.service';
import { Notificacion } from '../entities';
import {
  PageQuery,
  ReadModelService,
} from '../../geography/services/read-model.service';

@Injectable()
export class SupportService {
  constructor(
    private readonly reads: ReadModelService,
    private readonly casos: CasosSoporteService,
  ) {}

  async mensajesPropios(usuarioId: string, casoId: string, page: PageQuery) {
    await this.casos.detallePropio(usuarioId, casoId);
    return this.casos.mensajesPublicosDelCaso(usuarioId, casoId, page);
  }

  notificacionesPropias(usuarioId: string, page: PageQuery) {
    return this.reads.list(
      Notificacion,
      ['id', 'canal', 'titulo', 'contenido', 'leidoEn', 'creadoEn'],
      page,
      { usuarioId },
      { creadoEn: 'ASC', id: 'ASC' },
    );
  }
}
