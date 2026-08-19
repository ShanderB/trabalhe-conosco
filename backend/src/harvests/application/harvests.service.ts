import { ConflictException, Injectable } from '@nestjs/common';
import { Harvest } from '@prisma/client';
import { HarvestsRepository } from '../infrastructure/harvests.repository';
import { CreateHarvestDto } from './dto/create-harvest.dto';

@Injectable()
export class HarvestsService {
  constructor(private readonly repository: HarvestsRepository) {}

  async create(dto: CreateHarvestDto): Promise<Harvest> {
    const existing = await this.repository.findByYear(dto.year);
    if (existing) {
      throw new ConflictException(`Já existe uma safra cadastrada para o ano ${dto.year}.`);
    }
    return this.repository.create(dto);
  }

  findAll(): Promise<Harvest[]> {
    return this.repository.findAll();
  }
}
