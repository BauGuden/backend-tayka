import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { MedioPago } from '../entities';
import {
  PageQuery,
  ReadModelService,
} from '../../geography/services/read-model.service';

@Injectable()
export class FinanceService {
  constructor(private readonly reads: ReadModelService) {}
  mediosPago(page: PageQuery) {
    return this.reads.list(
      MedioPago,
      ['id', 'codigo', 'tipoMedio', 'nombreProveedorServicio', 'codigoMoneda'],
      page,
      {
        estaHabilitado: true,
        ambiente: 'produccion',
        tipoMedio: Not('prueba_manual'),
      },
      { codigo: 'ASC', id: 'ASC' },
    );
  }
}
