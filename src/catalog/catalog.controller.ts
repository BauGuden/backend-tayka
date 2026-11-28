import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsUUID } from 'class-validator';
import { CatalogService } from './services/catalog.service';
import { PageQuery } from '../geography/services/read-model.service';
import { ApiLecturaPublica } from '../common/api-lectura-publica';
import {
  CategoriaPublicoDto,
  MarcaPublicoDto,
  ProductoPublicoDto,
  ProveedorPublicoDto,
  VariantePublicoDto,
  ArchivoProductoPublicoDto,
} from '../common/dtos/public-api-responses.dto';

class ProductoQuery extends PageQuery {
  @ApiPropertyOptional({
    type: String,
    maxLength: 220,
    description: 'Texto literal para buscar en el nombre.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(220)
  nombre?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'Filtra por UUID de la categoría.',
  })
  @IsOptional()
  @IsUUID()
  categoriaId?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'Filtra por UUID de la marca.',
  })
  @IsOptional()
  @IsUUID()
  marcaId?: string;
}

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly service: CatalogService) {}

  @Get('categorias')
  @ApiLecturaPublica(
    CategoriaPublicoDto,
    'Listar categorías',
    'Incluye categorías activas. Orden por nombre y UUID.',
    { list: true },
  )
  categorias(@Query() q: PageQuery) {
    return this.service.categorias(q);
  }

  @Get('categorias/:id')
  @ApiLecturaPublica(
    CategoriaPublicoDto,
    'Consultar una categoría',
    'Solo categorías activas.',
    { idDescription: 'UUID de la categoría.' },
  )
  categoria(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.categoria(id);
  }

  @Get('marcas')
  @ApiLecturaPublica(
    MarcaPublicoDto,
    'Listar marcas',
    'Incluye marcas activas. Orden por nombre y UUID.',
    { list: true },
  )
  marcas(@Query() q: PageQuery) {
    return this.service.marcas(q);
  }

  @Get('marcas/:id')
  @ApiLecturaPublica(
    MarcaPublicoDto,
    'Consultar una marca',
    'Solo marcas activas.',
    { idDescription: 'UUID de la marca.' },
  )
  marca(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.marca(id);
  }

  @Get('productos')
  @ApiLecturaPublica(
    ProductoPublicoDto,
    'Listar productos',
    'Incluye productos activos y no eliminados. Combina los filtros enviados. Orden por nombre y UUID.',
    { list: true },
  )
  productos(@Query() q: ProductoQuery) {
    return this.service.productos(q, q);
  }

  @Get('productos/:id')
  @ApiLecturaPublica(
    ProductoPublicoDto,
    'Consultar un producto',
    'Solo productos activos y no eliminados.',
    { idDescription: 'UUID del producto.' },
  )
  producto(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.producto(id);
  }

  @Get('proveedores')
  @ApiLecturaPublica(
    ProveedorPublicoDto,
    'Listar proveedores',
    'Incluye proveedores verificados y no eliminados. Orden por UUID.',
    { list: true },
  )
  proveedores(@Query() q: PageQuery) {
    return this.service.proveedores(q);
  }

  @Get('proveedores/:id')
  @ApiLecturaPublica(
    ProveedorPublicoDto,
    'Consultar un proveedor',
    'Solo proveedores verificados y no eliminados.',
    { idDescription: 'UUID del proveedor.' },
  )
  proveedor(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.proveedor(id);
  }

  @Get('productos/:id/variantes')
  @ApiLecturaPublica(
    VariantePublicoDto,
    'Listar variantes de un producto',
    'Solo variantes activas de un producto visible. Orden por UUID.',
    { list: true, idDescription: 'UUID del producto.' },
  )
  variantes(@Param('id', ParseUUIDPipe) id: string, @Query() q: PageQuery) {
    return this.service.variantes(id, q);
  }

  @Get('variantes/:id')
  @ApiLecturaPublica(
    VariantePublicoDto,
    'Consultar una variante',
    'La variante y su producto deben ser visibles.',
    { idDescription: 'UUID de la variante.' },
  )
  variante(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.variante(id);
  }

  @Get('productos/:id/archivos')
  @ApiLecturaPublica(
    ArchivoProductoPublicoDto,
    'Listar archivos de un producto',
    'Solo archivos de un producto visible. Si el archivo pertenece a una variante, esta debe estar activa y corresponder al producto. Orden de visualización y UUID.',
    { list: true, idDescription: 'UUID del producto.' },
  )
  archivos(@Param('id', ParseUUIDPipe) id: string, @Query() q: PageQuery) {
    return this.service.archivos(id, q);
  }
}
