import { Module } from '@nestjs/common';
import { DashboardService } from './application/dashboard.service';
import { DashboardController } from './infrastructure/dashboard.controller';
import { DashboardRepository } from './infrastructure/dashboard.repository';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
})
export class DashboardModule {}
