import { Module } from '@nestjs/common';
import { PlantedCropsService } from './application/planted-crops.service';
import { PlantedCropsController } from './infrastructure/planted-crops.controller';
import { PlantedCropsRepository } from './infrastructure/planted-crops.repository';

@Module({
  controllers: [PlantedCropsController],
  providers: [PlantedCropsService, PlantedCropsRepository],
  exports: [PlantedCropsService],
})
export class PlantedCropsModule {}
