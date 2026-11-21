import { Module } from '@nestjs/common';
import { OperationsService } from './services/operations.service';
import { OperationsController } from './operations.controller';

@Module({
  controllers: [OperationsController],
  providers: [OperationsService],
})
export class OperationsModule {}
