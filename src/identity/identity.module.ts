import { Module } from '@nestjs/common';
import { GeographyModule } from '../geography/geography.module';
import { IdentityService } from './services/identity.service';

@Module({
  imports: [GeographyModule],
  providers: [IdentityService],
})
export class IdentityModule {}
