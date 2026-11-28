import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlockchainService } from './services/blockchain.service';
import { PageQuery } from '../geography/services/read-model.service';
import { ApiLecturaPublica } from '../common/api-lectura-publica';
import {
  RedPublicoDto,
  ActivoPublicoDto,
  DesplieguePublicoDto,
} from '../common/dtos/public-api-responses.dto';

@ApiTags('blockchain')
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly service: BlockchainService) {}

  @Get('redes')
  @ApiLecturaPublica(
    RedPublicoDto,
    'Listar redes habilitadas',
    'Metadatos públicos de redes habilitadas. Orden por nombre y UUID.',
    { list: true },
  )
  redes(@Query() q: PageQuery) {
    return this.service.redes(q);
  }

  @Get('redes/:id')
  @ApiLecturaPublica(
    RedPublicoDto,
    'Consultar metadatos de una red',
    'Solo redes habilitadas.',
    { idDescription: 'UUID de la red.' },
  )
  red(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.red(id);
  }

  @Get('activos')
  @ApiLecturaPublica(
    ActivoPublicoDto,
    'Listar activos habilitados',
    'Tanto el activo como su red deben estar habilitados. Orden por UUID.',
    { list: true },
  )
  activos(@Query() q: PageQuery) {
    return this.service.activos(q);
  }

  @Get('activos/:id')
  @ApiLecturaPublica(
    ActivoPublicoDto,
    'Consultar un activo habilitado',
    'Aplica la misma visibilidad del listado.',
    { idDescription: 'UUID del activo.' },
  )
  activo(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.activo(id);
  }

  @Get('despliegues')
  @ApiLecturaPublica(
    DesplieguePublicoDto,
    'Listar despliegues activos',
    'Solo despliegues activos en redes habilitadas. Orden por UUID.',
    { list: true },
  )
  despliegues(@Query() q: PageQuery) {
    return this.service.despliegues(q);
  }

  @Get('despliegues/:id')
  @ApiLecturaPublica(
    DesplieguePublicoDto,
    'Consultar un despliegue activo',
    'Aplica la misma visibilidad del listado.',
    { idDescription: 'UUID del despliegue.' },
  )
  despliegue(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.despliegue(id);
  }
}
