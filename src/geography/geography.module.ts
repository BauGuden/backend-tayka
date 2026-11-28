import { Module } from '@nestjs/common';
import { GeographyController } from './geography.controller';
import { GeographyService } from './services/geography.service';
import { DatabaseService } from './services/database.service';
import { ReadModelService } from './services/read-model.service';

@Module({
  controllers: [GeographyController],
  providers: [DatabaseService, ReadModelService, GeographyService],
  exports: [DatabaseService, ReadModelService],
})
export class GeographyModule {}
