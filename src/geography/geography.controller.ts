import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsUUID } from 'class-validator';
import { GeographyService } from './services/geography.service';
import { PageQuery } from './services/read-model.service';
import { ApiLecturaPublica } from '../common/api-lectura-publica';
import {
  DepartamentoPublicoDto,
  CiudadPublicoDto,
} from '../common/dtos/public-api-responses.dto';

class DepartamentoQuery extends PageQuery {
  @ApiPropertyOptional({
    type: String,
    maxLength: 100,
    description: 'Texto literal para buscar en el nombre.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;
}

class CiudadQuery extends PageQuery {
  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'Filtra por el UUID del departamento.',
  })
  @IsOptional()
  @IsUUID()
  departamentoId?: string;
}

@ApiTags('geography')
@Controller('geography')
export class GeographyController {
  constructor(private readonly service: GeographyService) {}

  @Get('departamentos')
  @ApiLecturaPublica(
    DepartamentoPublicoDto,
    'Listar departamentos',
    'Permite buscar por una parte literal del nombre. Orden por nombre y UUID.',
    { list: true },
  )
  departamentos(@Query() q: DepartamentoQuery) {
    return this.service.departamentos(q, q.nombre);
  }

  @Get('departamentos/:id')
  @ApiLecturaPublica(
    DepartamentoPublicoDto,
    'Consultar un departamento',
    'Busca por identificador.',
    { idDescription: 'UUID del departamento.' },
  )
  departamento(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.departamento(id);
  }

  @Get('departamentos/:id/ciudades')
  @ApiLecturaPublica(
    CiudadPublicoDto,
    'Listar ciudades de un departamento',
    'Comprueba que el departamento exista. Orden por nombre y UUID.',
    { list: true, idDescription: 'UUID del departamento.' },
  )
  ciudadesDeDepartamento(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() q: PageQuery,
  ) {
    return this.service.ciudadesDeDepartamento(id, q);
  }

  @Get('ciudades')
  @ApiLecturaPublica(
    CiudadPublicoDto,
    'Listar ciudades',
    'Puede filtrarse por departamento. Orden por nombre y UUID.',
    { list: true },
  )
  ciudades(@Query() q: CiudadQuery) {
    return this.service.ciudades(q, q.departamentoId);
  }

  @Get('ciudades/:id')
  @ApiLecturaPublica(
    CiudadPublicoDto,
    'Consultar una ciudad',
    'Busca por identificador.',
    { idDescription: 'UUID de la ciudad.' },
  )
  ciudad(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.ciudad(id);
  }
}
