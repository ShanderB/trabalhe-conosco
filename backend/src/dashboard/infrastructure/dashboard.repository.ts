import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface StateCount {
  state: string;
  count: number;
}

export interface CropCount {
  crop: string;
  count: number;
}

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  countFarms(): Promise<number> {
    return this.prisma.farm.count();
  }

  async sumTotalArea(): Promise<number> {
    const result = await this.prisma.farm.aggregate({ _sum: { totalArea: true } });
    return Number(result._sum.totalArea ?? 0);
  }

  async sumLandUse(): Promise<{ agricultable: number; vegetation: number }> {
    const result = await this.prisma.farm.aggregate({
      _sum: { agricultableArea: true, vegetationArea: true },
    });
    return {
      agricultable: Number(result._sum.agricultableArea ?? 0),
      vegetation: Number(result._sum.vegetationArea ?? 0),
    };
  }

  async countFarmsByState(): Promise<StateCount[]> {
    const groups = await this.prisma.farm.groupBy({
      by: ['state'],
      _count: { _all: true },
      orderBy: { state: 'asc' },
    });
    return groups.map((group) => ({ state: group.state, count: group._count._all }));
  }

  async countPlantedCropsByCropName(): Promise<CropCount[]> {
    const groups = await this.prisma.plantedCrop.groupBy({
      by: ['cropName'],
      _count: { _all: true },
      orderBy: { cropName: 'asc' },
    });
    return groups.map((group) => ({ crop: group.cropName, count: group._count._all }));
  }
}
