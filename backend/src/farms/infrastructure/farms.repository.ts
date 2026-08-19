import { Injectable } from '@nestjs/common';
import { Farm, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FarmsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.FarmUncheckedCreateInput): Promise<Farm> {
    return this.prisma.farm.create({ data });
  }

  findAll(producerId?: string): Promise<Farm[]> {
    return this.prisma.farm.findMany({
      where: producerId ? { producerId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string): Promise<Farm | null> {
    return this.prisma.farm.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.FarmUncheckedUpdateInput): Promise<Farm> {
    return this.prisma.farm.update({ where: { id }, data });
  }

  remove(id: string): Promise<Farm> {
    return this.prisma.farm.delete({ where: { id } });
  }
}
