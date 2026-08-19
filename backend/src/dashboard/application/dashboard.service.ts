import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../infrastructure/dashboard.repository';
import { DashboardSummaryDto } from './dto/dashboard-summary.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly repository: DashboardRepository) {}

  async getSummary(): Promise<DashboardSummaryDto> {
    const [totalFarms, totalHectares, landUse, byState, byCrop] = await Promise.all([
      this.repository.countFarms(),
      this.repository.sumTotalArea(),
      this.repository.sumLandUse(),
      this.repository.countFarmsByState(),
      this.repository.countPlantedCropsByCropName(),
    ]);

    return { totalFarms, totalHectares, byState, byCrop, landUse };
  }
}
