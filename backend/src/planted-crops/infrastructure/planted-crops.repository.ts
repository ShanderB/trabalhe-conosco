import { Injectable } from '@nestjs/common';
import { PlantedCrop, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlantedCropsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.PlantedCropUncheckedCreateInput): Promise<PlantedCrop> {
    return this.prisma.plantedCrop.create({ data });
  }

  findAll(): Promise<PlantedCrop[]> {
    return this.prisma.plantedCrop.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string): Promise<PlantedCrop | null> {
    return this.prisma.plantedCrop.findUnique({ where: { id } });
  }

  remove(id: string): Promise<PlantedCrop> {
    return this.prisma.plantedCrop.delete({ where: { id } });
  }
}
