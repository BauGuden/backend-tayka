import { Module } from '@nestjs/common';
import { GeographyModule } from '../geography/geography.module';
import { CatalogService } from './services/catalog.service';
import { CatalogController } from './catalog.controller';

@Module({
  imports: [GeographyModule],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
