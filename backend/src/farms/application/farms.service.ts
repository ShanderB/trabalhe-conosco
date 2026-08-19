import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NotFoundDomainError } from '../../common/errors/not-found.error';
import { assertValidFarmArea } from '../domain/area-rule';
import { FarmsRepository } from '../infrastructure/farms.repository';
import { CreateFarmDto } from './dto/create-farm.dto';
import { FarmResponseDto } from './dto/farm-response.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { toFarmResponseDto } from './farm.mapper';

const PRISMA_FOREIGN_KEY_ERROR = 'P2003';

@Injectable()
export class FarmsService {
  constructor(private readonly repository: FarmsRepository) {}

  async create(dto: CreateFarmDto): Promise<FarmResponseDto> {
    assertValidFarmArea(dto);

    try {
      const farm = await this.repository.create(dto);
      return toFarmResponseDto(farm);
    } catch (error) {
      throw this.translatePrismaError(error, dto.producerId);
    }
  }

  async findAll(producerId?: string): Promise<FarmResponseDto[]> {
    const farms = await this.repository.findAll(producerId);
    return farms.map(toFarmResponseDto);
  }

  async findOne(id: string): Promise<FarmResponseDto> {
    const farm = await this.repository.findById(id);
    if (!farm) {
      throw new NotFoundDomainError('Fazenda', id);
    }
    return toFarmResponseDto(farm);
  }

  async update(id: string, dto: UpdateFarmDto): Promise<FarmResponseDto> {
    const current = await this.findOne(id);

    assertValidFarmArea({
      totalArea: dto.totalArea ?? current.totalArea,
      agricultableArea: dto.agricultableArea ?? current.agricultableArea,
      vegetationArea: dto.vegetationArea ?? current.vegetationArea,
    });

    try {
      const farm = await this.repository.update(id, dto);
      return toFarmResponseDto(farm);
    } catch (error) {
      throw this.translatePrismaError(error, dto.producerId ?? current.producerId);
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.remove(id);
  }

  private translatePrismaError(error: unknown, producerId: string): Error {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === PRISMA_FOREIGN_KEY_ERROR
    ) {
      return new NotFoundDomainError('Produtor', producerId);
    }
    return error as Error;
  }
}
