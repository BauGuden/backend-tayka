import { Module } from '@nestjs/common';
import { GeographyModule } from '../geography/geography.module';
import { CommerceService } from './services/commerce.service';
import { CommerceController } from './commerce.controller';

@Module({
  imports: [GeographyModule],
  controllers: [CommerceController],
  providers: [CommerceService],
})
export class CommerceModule {}
