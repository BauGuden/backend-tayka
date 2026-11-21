import { Module } from '@nestjs/common';
import { IdentityModule } from './identity/identity.module';
import { GeographyModule } from './geography/geography.module';
import { FinanceModule } from './finance/finance.module';
import { CommunityModule } from './community/community.module';
import { CommerceModule } from './commerce/commerce.module';
import { CatalogModule } from './catalog/catalog.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { LogisticsModule } from './logistics/logistics.module';
import { OperationsModule } from './operations/operations.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [IdentityModule, GeographyModule, FinanceModule, CommunityModule, CommerceModule, CatalogModule, BlockchainModule, LogisticsModule, OperationsModule, SupportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
