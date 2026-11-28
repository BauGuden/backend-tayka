import { Injectable } from '@nestjs/common';

import { Activo, DespliegueContrato, Red } from '../entities';
import {
  PageQuery,
  ReadModelService,
} from '../../geography/services/read-model.service';

@Injectable()
export class BlockchainService {
  constructor(private readonly reads: ReadModelService) {}
  redes(page: PageQuery) {
    return this.reads.list(
      Red,
      ['id', 'nombre'],
      page,
      { estaHabilitado: true },
      { nombre: 'ASC', id: 'ASC' },
    );
  }

  red(id: string) {
    return this.reads.detail(Red, ['id', 'nombre'], {
      id,
      estaHabilitado: true,
    });
  }

  activos(page: PageQuery) {
    return this.reads.list(
      Activo,
      [
        'id',
        'redId',
        'codigoActivo',
        'direccionEmisor',
        'direccionContrato',
        'decimales',
      ],
      page,
      { estaHabilitado: true, red: { estaHabilitado: true } },
    );
  }

  activo(id: string) {
    return this.reads.detail(
      Activo,
      [
        'id',
        'redId',
        'codigoActivo',
        'direccionEmisor',
        'direccionContrato',
        'decimales',
      ],
      { id, estaHabilitado: true, red: { estaHabilitado: true } },
    );
  }

  despliegues(page: PageQuery) {
    return this.reads.list(
      DespliegueContrato,
      [
        'id',
        'redId',
        'nombreContrato',
        'direccionContrato',
        'version',
        'desplegadoEn',
      ],
      page,
      { estaActivo: true, red: { estaHabilitado: true } },
    );
  }

  despliegue(id: string) {
    return this.reads.detail(
      DespliegueContrato,
      [
        'id',
        'redId',
        'nombreContrato',
        'direccionContrato',
        'version',
        'desplegadoEn',
      ],
      { id, estaActivo: true, red: { estaHabilitado: true } },
    );
  }
}
