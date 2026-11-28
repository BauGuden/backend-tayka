import { Module } from '@nestjs/common';
import { GeographyModule } from '../geography/geography.module';
import { CommunityService } from './services/community.service';
import { CommunityController } from './community.controller';

@Module({
  imports: [GeographyModule],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
