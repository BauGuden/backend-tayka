import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { LogisticsService } from './services/logistics.service';
import { PageQuery } from '../geography/services/read-model.service';
import { ApiLecturaPublica } from '../common/api-lectura-publica';
import {
  PuntoRetiroPublicoDto,
  TransportistaPublicoDto,
} from '../common/dtos/public-api-responses.dto';

class PuntoRetiroQuery extends PageQuery {
  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'Filtra por UUID de la ciudad.',
  })
  @IsOptional()
  @IsUUID()
  ciudadId?: string;
}

@ApiTags('logistics')
@Controller('logistics')
export class LogisticsController {
  constructor(private readonly service: LogisticsService) {}

  @Get('puntos-retiro')
  @ApiLecturaPublica(
    PuntoRetiroPublicoDto,
    'Listar puntos de retiro',
    'Puntos activos con filtro opcional por ciudad. Orden por nombre y UUID.',
    { list: true },
  )
  puntosRetiro(@Query() q: PuntoRetiroQuery) {
    return this.service.puntosRetiro(q, q.ciudadId);
  }

  @Get('puntos-retiro/:id')
  @ApiLecturaPublica(
    PuntoRetiroPublicoDto,
    'Consultar un punto de retiro',
    'Solo puntos activos.',
    { idDescription: 'UUID del punto de retiro.' },
  )
  puntoRetiro(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.puntoRetiro(id);
  }

  @Get('transportistas')
  @ApiLecturaPublica(
    TransportistaPublicoDto,
    'Listar transportistas',
    'Transportistas activos. Orden por nombre y UUID.',
    { list: true },
  )
  transportistas(@Query() q: PageQuery) {
    return this.service.transportistas(q);
  }

  @Get('transportistas/:id')
  @ApiLecturaPublica(
    TransportistaPublicoDto,
    'Consultar un transportista',
    'Solo transportistas activos.',
    { idDescription: 'UUID del transportista.' },
  )
  transportista(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.transportista(id);
  }
}
