import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import {
  ArchivoProducto,
  Categoria,
  Marca,
  Producto,
  Proveedor,
  VarianteProducto,
} from '../entities';
import {
  containsIgnoreCase,
  PageQuery,
  ReadModelService,
} from '../../geography/services/read-model.service';

export const productoPublico = () => ({
  estado: 'activo',
  eliminadoEn: IsNull(),
});
export const proveedorPublico = () => ({
  estado: 'verificado',
  eliminadoEn: IsNull(),
});
const CATEGORIA = [
  'id',
  'padreId',
  'nombre',
  'identificadorUrl',
  'descripcion',
] as const;
const MARCA = ['id', 'nombre'] as const;
const PRODUCTO = [
  'id',
  'categoriaId',
  'marcaId',
  'nombre',
  'identificadorUrl',
  'descripcion',
  'descripcionGarantia',
  'esPerecedero',
  'esRegulado',
] as const;
const PROVEEDOR = ['id', 'nombreComercial', 'descripcion', 'ciudadId'] as const;
const VARIANTE = [
  'id',
  'productoId',
  'sku',
  'nombre',
  'unidad',
  'unidadesPorPaquete',
  'pesoGramos',
] as const;
const ARCHIVO = [
  'id',
  'productoId',
  'varianteId',
  'urlArchivo',
  'textoAlternativo',
  'tipoArchivo',
  'ordenVisualizacion',
] as const;

@Injectable()
export class CatalogService {
  constructor(private readonly reads: ReadModelService) {}

  categorias(page: PageQuery) {
    return this.reads.list(
      Categoria,
      CATEGORIA,
      page,
      { estaActivo: true },
      { nombre: 'ASC', id: 'ASC' },
    );
  }

  categoria(id: string) {
    return this.reads.detail(Categoria, CATEGORIA, { id, estaActivo: true });
  }

  marcas(page: PageQuery) {
    return this.reads.list(
      Marca,
      MARCA,
      page,
      { estaActivo: true },
      { nombre: 'ASC', id: 'ASC' },
    );
  }

  marca(id: string) {
    return this.reads.detail(Marca, MARCA, { id, estaActivo: true });
  }

  productos(
    page: PageQuery,
    {
      nombre,
      categoriaId,
      marcaId,
    }: { nombre?: string; categoriaId?: string; marcaId?: string },
  ) {
    return this.reads.list(
      Producto,
      PRODUCTO,
      page,
      {
        ...productoPublico(),
        ...(nombre && { nombre: containsIgnoreCase(nombre) }),
        ...(categoriaId && { categoriaId }),
        ...(marcaId && { marcaId }),
      },
      { nombre: 'ASC', id: 'ASC' },
    );
  }

  producto(id: string) {
    return this.reads.detail(Producto, PRODUCTO, { id, ...productoPublico() });
  }

  proveedores(page: PageQuery) {
    return this.reads.list(Proveedor, PROVEEDOR, page, proveedorPublico());
  }

  proveedor(id: string) {
    return this.reads.detail(Proveedor, PROVEEDOR, {
      id,
      ...proveedorPublico(),
    });
  }

  async variantes(productoId: string, page: PageQuery) {
    await this.producto(productoId);
    return this.reads.list(VarianteProducto, VARIANTE, page, {
      productoId,
      estaActivo: true,
      producto: productoPublico(),
    });
  }

  variante(id: string) {
    return this.reads.detail(VarianteProducto, VARIANTE, {
      id,
      estaActivo: true,
      producto: productoPublico(),
    });
  }

  async archivos(productoId: string, page: PageQuery) {
    await this.producto(productoId);
    const producto = productoPublico();
    return this.reads.list(
      ArchivoProducto,
      ARCHIVO,
      page,
      [
        { productoId, producto, varianteId: IsNull() },
        { productoId, producto, variante: { productoId, estaActivo: true } },
      ],
      { ordenVisualizacion: 'ASC', id: 'ASC' },
    );
  }
}
