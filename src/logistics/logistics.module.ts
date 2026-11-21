import { Module } from '@nestjs/common';
import { LogisticsService } from './services/logistics.service';
import { LogisticsController } from './logistics.controller';

@Module({
  controllers: [LogisticsController],
  providers: [LogisticsService],
})
export class LogisticsModule {}
