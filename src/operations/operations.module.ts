import { Module } from '@nestjs/common';
import { OperationsService } from './services/operations.service';

@Module({
  providers: [OperationsService],
})
export class OperationsModule {}
