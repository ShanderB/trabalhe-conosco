import { Injectable } from '@nestjs/common';
import { Harvest, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HarvestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.HarvestCreateInput): Promise<Harvest> {
    return this.prisma.harvest.create({ data });
  }

  findAll(): Promise<Harvest[]> {
    return this.prisma.harvest.findMany({ orderBy: { year: 'desc' } });
  }

  findByYear(year: number): Promise<Harvest | null> {
    return this.prisma.harvest.findUnique({ where: { year } });
  }
}
