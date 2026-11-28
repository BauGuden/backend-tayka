import { Module } from '@nestjs/common';
import { GeographyModule } from '../geography/geography.module';
import { BlockchainService } from './services/blockchain.service';
import { BlockchainController } from './blockchain.controller';

@Module({
  imports: [GeographyModule],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
