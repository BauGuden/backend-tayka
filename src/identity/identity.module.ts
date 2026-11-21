import { Module } from '@nestjs/common';
import { IdentityService } from './services/identity.service';
import { IdentityController } from './identity.controller';

@Module({
  controllers: [IdentityController],
  providers: [IdentityService],
})
export class IdentityModule {}
