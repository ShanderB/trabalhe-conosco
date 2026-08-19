import { Module } from '@nestjs/common';
import { HarvestsService } from './application/harvests.service';
import { HarvestsController } from './infrastructure/harvests.controller';
import { HarvestsRepository } from './infrastructure/harvests.repository';

@Module({
  controllers: [HarvestsController],
  providers: [HarvestsService, HarvestsRepository],
  exports: [HarvestsService],
})
export class HarvestsModule {}
