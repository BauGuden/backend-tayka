import { Injectable } from '@nestjs/common';

import { PuntoRetiro, Transportista } from '../entities';
import {
  PageQuery,
  ReadModelService,
} from '../../geography/services/read-model.service';

@Injectable()
export class LogisticsService {
  constructor(private readonly reads: ReadModelService) {}
  puntosRetiro(page: PageQuery, ciudadId?: string) {
    return this.reads.list(
      PuntoRetiro,
      ['id', 'ciudadId', 'nombre', 'direccion', 'latitud', 'longitud'],
      page,
      { estaActivo: true, ...(ciudadId && { ciudadId }) },
      { nombre: 'ASC', id: 'ASC' },
    );
  }

  puntoRetiro(id: string) {
    return this.reads.detail(
      PuntoRetiro,
      ['id', 'ciudadId', 'nombre', 'direccion', 'latitud', 'longitud'],
      { id, estaActivo: true },
    );
  }

  transportistas(page: PageQuery) {
    return this.reads.list(
      Transportista,
      ['id', 'nombre'],
      page,
      { estado: 'activo' },
      { nombre: 'ASC', id: 'ASC' },
    );
  }

  transportista(id: string) {
    return this.reads.detail(Transportista, ['id', 'nombre'], {
      id,
      estado: 'activo',
    });
  }
}
