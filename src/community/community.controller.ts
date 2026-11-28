import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { CommunityService } from './services/community.service';
import { PageQuery } from '../geography/services/read-model.service';
import { ApiLecturaPublica } from '../common/api-lectura-publica';
import {
  ComentarioPublicoDto,
  ResenaPublicoDto,
} from '../common/dtos/public-api-responses.dto';

class ComentarioQuery extends PageQuery {
  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'UUID del producto. Envía exactamente un destino.',
  })
  @IsOptional()
  @IsUUID()
  productoId?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'UUID de la oferta. Envía exactamente un destino.',
  })
  @IsOptional()
  @IsUUID()
  ofertaId?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'UUID del grupo. Envía exactamente un destino.',
  })
  @IsOptional()
  @IsUUID()
  grupoId?: string;
}

class ResenaQuery extends PageQuery {
  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'UUID del producto. Envía exactamente un destino.',
  })
  @IsOptional()
  @IsUUID()
  productoId?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'UUID del proveedor. Envía exactamente un destino.',
  })
  @IsOptional()
  @IsUUID()
  proveedorId?: string;
}

@ApiTags('community')
@Controller('community')
export class CommunityController {
  constructor(private readonly service: CommunityService) {}

  @Get('comentarios')
  @ApiLecturaPublica(
    ComentarioPublicoDto,
    'Listar comentarios visibles',
    'Indica exactamente uno de productoId, ofertaId o grupoId. El destino debe ser visible. Orden por UUID.',
    { list: true },
  )
  comentarios(@Query() q: ComentarioQuery) {
    return this.service.comentarios(q, q);
  }

  @Get('comentarios/:id')
  @ApiLecturaPublica(
    ComentarioPublicoDto,
    'Consultar un comentario',
    'Debe estar visible, sin eliminación lógica y asociado a un destino visible.',
    { idDescription: 'UUID del comentario.' },
  )
  comentario(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.comentario(id);
  }

  @Get('resenas')
  @ApiLecturaPublica(
    ResenaPublicoDto,
    'Listar reseñas visibles',
    'Indica exactamente uno de productoId o proveedorId. El destino debe ser visible. Orden por UUID.',
    { list: true },
  )
  resenas(@Query() q: ResenaQuery) {
    return this.service.resenas(q, q);
  }

  @Get('resenas/:id')
  @ApiLecturaPublica(
    ResenaPublicoDto,
    'Consultar una reseña',
    'Debe estar visible y asociada a un producto activo o un proveedor verificado sin eliminación lógica.',
    { idDescription: 'UUID de la reseña.' },
  )
  resena(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.resena(id);
  }
}
