import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { CommerceService } from './services/commerce.service';
import { PageQuery } from '../geography/services/read-model.service';
import { ApiLecturaPublica } from '../common/api-lectura-publica';
import {
  OfertaPublicoDto,
  DestinoOfertaPublicoDto,
  GrupoCompraPublicoDto,
  ProgresoGrupoPublicoDto,
} from '../common/dtos/public-api-responses.dto';

class OfertaQuery extends PageQuery {
  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'Destino de entrega habilitado en esta ciudad.',
  })
  @IsOptional()
  @IsUUID()
  ciudadId?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'Filtra por UUID de variante.',
  })
  @IsOptional()
  @IsUUID()
  varianteId?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'Filtra por UUID de proveedor.',
  })
  @IsOptional()
  @IsUUID()
  proveedorId?: string;
}

@ApiTags('commerce')
@Controller('commerce')
export class CommerceController {
  constructor(private readonly service: CommerceService) {}

  @Get('ofertas')
  @ApiLecturaPublica(
    OfertaPublicoDto,
    'Listar ofertas vigentes',
    'Incluye ofertas activas dentro de su vigencia, para proveedores verificados y variantes y productos visibles. El filtro por ciudad requiere un destino habilitado. Orden por UUID.',
    { list: true },
  )
  ofertas(@Query() q: OfertaQuery) {
    return this.service.ofertas(q, q);
  }

  @Get('ofertas/:id')
  @ApiLecturaPublica(
    OfertaPublicoDto,
    'Consultar una oferta vigente',
    'Aplica la misma visibilidad del listado.',
    { idDescription: 'UUID de la oferta.' },
  )
  oferta(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.oferta(id);
  }

  @Get('ofertas/:id/destinos')
  @ApiLecturaPublica(
    DestinoOfertaPublicoDto,
    'Listar destinos de una oferta',
    'Incluye destinos habilitados de una oferta vigente. Orden por UUID.',
    { list: true, idDescription: 'UUID de la oferta.' },
  )
  destinos(@Param('id', ParseUUIDPipe) id: string, @Query() q: PageQuery) {
    return this.service.destinos(id, q);
  }

  @Get('grupos')
  @ApiLecturaPublica(
    GrupoCompraPublicoDto,
    'Listar grupos disponibles',
    'Incluye grupos abiertos o con pago abierto dentro de su plazo y cuya oferta siga visible. Orden por UUID.',
    { list: true },
  )
  grupos(@Query() q: PageQuery) {
    return this.service.grupos(q);
  }

  @Get('grupos/:id')
  @ApiLecturaPublica(
    GrupoCompraPublicoDto,
    'Consultar un grupo disponible',
    'Aplica los filtros de visibilidad y plazo del listado.',
    { idDescription: 'UUID del grupo.' },
  )
  grupo(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.grupo(id);
  }

  @Get('grupos/:id/progreso')
  @ApiLecturaPublica(
    ProgresoGrupoPublicoDto,
    'Consultar el progreso de un grupo',
    'Suma cantidades y cuenta compradores de participaciones activas en una misma instantánea.',
    { idDescription: 'UUID del grupo.' },
  )
  progreso(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.progreso(id);
  }

  @Get('grupos/:id/participantes')
  @ApiLecturaPublica(
    ProgresoGrupoPublicoDto,
    'Consultar totales de participación',
    'Mismos totales que progreso. La respuesta contiene únicamente agregados.',
    { idDescription: 'UUID del grupo.' },
  )
  participantes(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.progreso(id);
  }
}
