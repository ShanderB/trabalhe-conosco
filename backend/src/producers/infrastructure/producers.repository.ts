import { Injectable } from '@nestjs/common';
import { Prisma, Producer } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProducersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ProducerCreateInput): Promise<Producer> {
    return this.prisma.producer.create({ data });
  }

  findAll(): Promise<Producer[]> {
    return this.prisma.producer.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string): Promise<Producer | null> {
    return this.prisma.producer.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.ProducerUpdateInput): Promise<Producer> {
    return this.prisma.producer.update({ where: { id }, data });
  }

  remove(id: string): Promise<Producer> {
    return this.prisma.producer.delete({ where: { id } });
  }
}
