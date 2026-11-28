import { Module } from '@nestjs/common';
import { GeographyModule } from '../geography/geography.module';
import { LogisticsService } from './services/logistics.service';
import { LogisticsController } from './logistics.controller';

@Module({
  imports: [GeographyModule],
  controllers: [LogisticsController],
  providers: [LogisticsService],
})
export class LogisticsModule {}
