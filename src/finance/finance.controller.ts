import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FinanceService } from './services/finance.service';
import { PageQuery } from '../geography/services/read-model.service';
import { ApiLecturaPublica } from '../common/api-lectura-publica';
import { MedioPagoPublicoDto } from '../common/dtos/public-api-responses.dto';

@ApiTags('finance')
@Controller('finance')
export class FinanceController {
  constructor(private readonly service: FinanceService) {}

  @Get('medios-pago')
  @ApiLecturaPublica(
    MedioPagoPublicoDto,
    'Listar medios de pago disponibles',
    'Incluye medios habilitados para producción. Excluye los medios de prueba manual. Orden por código y UUID.',
    { list: true },
  )
  mediosPago(@Query() q: PageQuery) {
    return this.service.mediosPago(q);
  }
}
