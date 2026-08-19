import { Module } from '@nestjs/common';
import { ProducersService } from './application/producers.service';
import { ProducersController } from './infrastructure/producers.controller';
import { ProducersRepository } from './infrastructure/producers.repository';

@Module({
  controllers: [ProducersController],
  providers: [ProducersService, ProducersRepository],
  exports: [ProducersService],
})
export class ProducersModule {}
