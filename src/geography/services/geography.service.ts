import { Injectable } from '@nestjs/common';
import { Ciudad, Departamento } from '../entities';
import {
  containsIgnoreCase,
  PageQuery,
  ReadModelService,
} from './read-model.service';

const DEPARTAMENTO = ['id', 'nombre', 'abreviatura'] as const;
const CIUDAD = ['id', 'departamentoId', 'nombre', 'codigoPostal'] as const;

@Injectable()
export class GeographyService {
  constructor(private readonly reads: ReadModelService) {}

  departamentos(page: PageQuery, nombre?: string) {
    return this.reads.list(
      Departamento,
      DEPARTAMENTO,
      page,
      nombre ? { nombre: containsIgnoreCase(nombre) } : {},
      { nombre: 'ASC', id: 'ASC' },
    );
  }

  departamento(id: string) {
    return this.reads.detail(Departamento, DEPARTAMENTO, { id });
  }

  ciudades(page: PageQuery, departamentoId?: string) {
    return this.reads.list(
      Ciudad,
      CIUDAD,
      page,
      departamentoId ? { departamentoId } : {},
      { nombre: 'ASC', id: 'ASC' },
    );
  }

  ciudad(id: string) {
    return this.reads.detail(Ciudad, CIUDAD, { id });
  }

  async ciudadesDeDepartamento(id: string, page: PageQuery) {
    await this.departamento(id);
    return this.ciudades(page, id);
  }
}
