import { Injectable } from '@nestjs/common';
import { PlantedCrop, Prisma } from '@prisma/client';
import { NotFoundDomainError } from '../../common/errors/not-found.error';
import { PlantedCropsRepository } from '../infrastructure/planted-crops.repository';
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';

const PRISMA_FOREIGN_KEY_ERROR = 'P2003';

@Injectable()
export class PlantedCropsService {
  constructor(private readonly repository: PlantedCropsRepository) {}

  async create(dto: CreatePlantedCropDto): Promise<PlantedCrop> {
    try {
      return await this.repository.create(dto);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PRISMA_FOREIGN_KEY_ERROR
      ) {
        throw new NotFoundDomainError('Fazenda ou safra', `${dto.farmId} / ${dto.harvestId}`);
      }
      throw error;
    }
  }

  findAll(): Promise<PlantedCrop[]> {
    return this.repository.findAll();
  }

  async remove(id: string): Promise<void> {
    const plantedCrop = await this.repository.findById(id);
    if (!plantedCrop) {
      throw new NotFoundDomainError('Cultura plantada', id);
    }
    await this.repository.remove(id);
  }
}
