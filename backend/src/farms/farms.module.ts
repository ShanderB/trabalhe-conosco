import { Module } from '@nestjs/common';
import { FarmsService } from './application/farms.service';
import { FarmsController } from './infrastructure/farms.controller';
import { FarmsRepository } from './infrastructure/farms.repository';

@Module({
  controllers: [FarmsController],
  providers: [FarmsService, FarmsRepository],
  exports: [FarmsService],
})
export class FarmsModule {}
