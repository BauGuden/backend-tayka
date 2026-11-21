import { Module } from '@nestjs/common';
import { CommunityService } from './services/community.service';
import { CommunityController } from './community.controller';

@Module({
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
