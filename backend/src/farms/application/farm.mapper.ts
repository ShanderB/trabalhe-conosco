import { Farm } from '@prisma/client';
import { FarmResponseDto } from './dto/farm-response.dto';

export function toFarmResponseDto(farm: Farm): FarmResponseDto {
  return {
    id: farm.id,
    producerId: farm.producerId,
    name: farm.name,
    city: farm.city,
    state: farm.state,
    totalArea: Number(farm.totalArea),
    agricultableArea: Number(farm.agricultableArea),
    vegetationArea: Number(farm.vegetationArea),
    createdAt: farm.createdAt,
    updatedAt: farm.updatedAt,
  };
}
