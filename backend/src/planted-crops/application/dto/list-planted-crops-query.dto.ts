import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class ListPlantedCropsQueryDto {
  @ApiPropertyOptional({ description: 'Filtra culturas plantadas de uma fazenda específica.' })
  @IsOptional()
  @IsUUID(undefined, { message: 'Id da fazenda inválido.' })
  farmId?: string;
}
