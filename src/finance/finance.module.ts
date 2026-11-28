import { Module } from '@nestjs/common';
import { GeographyModule } from '../geography/geography.module';
import { FinanceService } from './services/finance.service';
import { FinanceController } from './finance.controller';

@Module({
  imports: [GeographyModule],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
