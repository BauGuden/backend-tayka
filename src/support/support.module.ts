import { Module } from '@nestjs/common';
import { GeographyModule } from '../geography/geography.module';
import { SupportService } from './services/support.service';
import { CasosSoporteService } from './services/casos-soporte.service';

@Module({
  imports: [GeographyModule],
  providers: [SupportService, CasosSoporteService],
})
export class SupportModule {}
