import { Module } from '@nestjs/common';
import { SupportService } from './services/support.service';
import { SupportController } from './support.controller';

@Module({
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
