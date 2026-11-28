import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorHttpDto {
  @ApiProperty({ type: 'integer', example: 400 })
  statusCode!: number;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  message!: string | string[];

  @ApiPropertyOptional()
  error?: string;
}

export class DepartamentoPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, maxLength: 100 })
  nombre!: string;

  @ApiProperty({ type: String, maxLength: 8, nullable: true })
  abreviatura!: string | null;
}

export class CiudadPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  departamentoId!: string;

  @ApiProperty({ type: String, maxLength: 120 })
  nombre!: string;

  @ApiProperty({ type: String, maxLength: 20, nullable: true })
  codigoPostal!: string | null;
}

export class CategoriaPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  padreId!: string | null;

  @ApiProperty({ type: String, maxLength: 120 })
  nombre!: string;

  @ApiProperty({ type: String, maxLength: 140 })
  identificadorUrl!: string;

  @ApiProperty({ type: String, nullable: true })
  descripcion!: string | null;
}

export class MarcaPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, maxLength: 120 })
  nombre!: string;
}

export class ProductoPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  categoriaId!: string;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  marcaId!: string | null;

  @ApiProperty({ type: String, maxLength: 220 })
  nombre!: string;

  @ApiProperty({ type: String, maxLength: 260 })
  identificadorUrl!: string;

  @ApiProperty({ type: String, nullable: true })
  descripcion!: string | null;

  @ApiProperty({ type: String, nullable: true })
  descripcionGarantia!: string | null;

  @ApiProperty({ type: Boolean })
  esPerecedero!: boolean;

  @ApiProperty({ type: Boolean })
  esRegulado!: boolean;
}

export class ProveedorPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, maxLength: 220, nullable: true })
  nombreComercial!: string | null;

  @ApiProperty({ type: String, nullable: true })
  descripcion!: string | null;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  ciudadId!: string | null;
}

export class VariantePublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  productoId!: string;

  @ApiProperty({ type: String, maxLength: 100 })
  sku!: string;

  @ApiProperty({ type: String, maxLength: 180 })
  nombre!: string;

  @ApiProperty({
    type: String,
    enum: ['pieza', 'caja', 'paquete', 'kg', 'g', 'l', 'ml'],
  })
  unidad!: 'pieza' | 'caja' | 'paquete' | 'kg' | 'g' | 'l' | 'ml';

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{3}$',
    example: '12.000',
    description: 'Decimal exacto representado como texto.',
  })
  unidadesPorPaquete!: string;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{3}$',
    example: '12.000',
    description: 'Decimal exacto representado como texto.',
    nullable: true,
  })
  pesoGramos!: string | null;
}

export class ArchivoProductoPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  productoId!: string;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  varianteId!: string | null;

  @ApiProperty({ type: String })
  urlArchivo!: string;

  @ApiProperty({ type: String, maxLength: 250, nullable: true })
  textoAlternativo!: string | null;

  @ApiProperty({ type: String, enum: ['imagen', 'video'] })
  tipoArchivo!: 'imagen' | 'video';

  @ApiProperty({ type: 'integer' })
  ordenVisualizacion!: number;
}

export class OfertaPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  proveedorId!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  varianteId!: string;

  @ApiProperty({ type: String, maxLength: 220 })
  titulo!: string;

  @ApiProperty({ type: String, nullable: true })
  descripcionCondiciones!: string | null;

  @ApiProperty({ type: String, maxLength: 12 })
  codigoMoneda!: string;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{7}$',
    example: '12.0000000',
    description: 'Decimal exacto representado como texto.',
  })
  precioUnitario!: string;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{7}$',
    example: '12.0000000',
    description: 'Decimal exacto representado como texto.',
    nullable: true,
  })
  precioMinoristaReferencia!: string | null;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{3}$',
    example: '12.000',
    description: 'Decimal exacto representado como texto.',
  })
  cantidadMinimaPedido!: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  minimoCompradores!: number;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{3}$',
    example: '12.000',
    description: 'Decimal exacto representado como texto.',
    nullable: true,
  })
  cantidadMaxima!: string | null;

  @ApiProperty({ type: String, format: 'date-time' })
  vigenteDesde!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  vigenteHasta!: string;

  @ApiProperty({ type: String, nullable: true })
  condicionesGarantia!: string | null;

  @ApiProperty({ type: String, nullable: true })
  condicionesDevolucion!: string | null;
}

export class DestinoOfertaPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  ciudadId!: string;

  @ApiProperty({ type: String, enum: ['retiro', 'envio'] })
  modalidadEntrega!: 'retiro' | 'envio';

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{7}$',
    example: '12.0000000',
    description: 'Decimal exacto representado como texto.',
  })
  costoEnvioEstimado!: string;
}

export class GrupoCompraPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  ofertaId!: string;

  @ApiProperty({ type: String, maxLength: 40 })
  codigoGrupo!: string;

  @ApiProperty({ type: String, enum: ['abierto', 'pago_abierto'] })
  estado!: 'abierto' | 'pago_abierto';

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{3}$',
    example: '12.000',
    description: 'Decimal exacto representado como texto.',
  })
  cantidadMinimaFijada!: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  minimoCompradoresFijado!: number;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{7}$',
    example: '12.0000000',
    description: 'Decimal exacto representado como texto.',
  })
  precioFijado!: string;

  @ApiProperty({ type: String, maxLength: 12 })
  codigoMoneda!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  plazoAdhesion!: string;

  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  plazoPago!: string | null;
}

export class ProgresoGrupoPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  grupoId!: string;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{3}$',
    example: '12.000',
    description: 'Decimal exacto representado como texto.',
  })
  cantidadMinima!: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  minimoCompradores!: number;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{3}$',
    example: '12.000',
    description: 'Decimal exacto representado como texto.',
  })
  cantidad!: string;

  @ApiProperty({
    type: String,
    pattern: '^[0-9]+$',
    example: '12',
    description: 'Total de compradores activos como entero textual.',
  })
  compradores!: string;
}

export class ComentarioPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  productoId!: string | null;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  ofertaId!: string | null;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  grupoId!: string | null;

  @ApiProperty({ type: String })
  contenido!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  creadoEn!: string;
}

export class ResenaPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  productoId!: string | null;

  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  proveedorId!: string | null;

  @ApiProperty({ type: 'integer', minimum: 1, maximum: 5 })
  calificacion!: number;

  @ApiProperty({ type: String, maxLength: 180, nullable: true })
  titulo!: string | null;

  @ApiProperty({ type: String, nullable: true })
  contenido!: string | null;

  @ApiProperty({ type: String, format: 'date-time' })
  creadoEn!: string;
}

export class PuntoRetiroPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  ciudadId!: string;

  @ApiProperty({ type: String, maxLength: 160 })
  nombre!: string;

  @ApiProperty({ type: String, maxLength: 300 })
  direccion!: string;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{7}$',
    example: '-16.0000000',
    description: 'Decimal exacto representado como texto.',
    nullable: true,
  })
  latitud!: string | null;

  @ApiProperty({
    type: String,
    pattern: '^-?[0-9]+\\.[0-9]{7}$',
    example: '-16.0000000',
    description: 'Decimal exacto representado como texto.',
    nullable: true,
  })
  longitud!: string | null;
}

export class TransportistaPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, maxLength: 150 })
  nombre!: string;
}

export class RedPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, maxLength: 40 })
  nombre!: string;
}

export class ActivoPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  redId!: string;

  @ApiProperty({ type: String, maxLength: 24 })
  codigoActivo!: string;

  @ApiProperty({ type: String, maxLength: 100, nullable: true })
  direccionEmisor!: string | null;

  @ApiProperty({ type: String, maxLength: 100, nullable: true })
  direccionContrato!: string | null;

  @ApiProperty({ type: 'integer', minimum: 0, maximum: 18 })
  decimales!: number;
}

export class DesplieguePublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  redId!: string;

  @ApiProperty({ type: String, maxLength: 100 })
  nombreContrato!: string;

  @ApiProperty({ type: String, maxLength: 100 })
  direccionContrato!: string;

  @ApiProperty({ type: String, maxLength: 40 })
  version!: string;

  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  desplegadoEn!: string | null;
}

export class MedioPagoPublicoDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, maxLength: 50 })
  codigo!: string;

  @ApiProperty({
    type: String,
    enum: ['transferencia_bancaria', 'qr', 'token_stellar'],
  })
  tipoMedio!: 'transferencia_bancaria' | 'qr' | 'token_stellar';

  @ApiProperty({ type: String, maxLength: 120, nullable: true })
  nombreProveedorServicio!: string | null;

  @ApiProperty({ type: String, maxLength: 12 })
  codigoMoneda!: string;
}
