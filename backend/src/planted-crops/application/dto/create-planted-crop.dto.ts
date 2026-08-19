import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePlantedCropDto {
  @ApiProperty({ description: 'Id da fazenda onde a cultura foi plantada.' })
  @IsUUID(undefined, { message: 'Id da fazenda inválido.' })
  farmId!: string;

  @ApiProperty({ description: 'Id da safra em que a cultura foi plantada.' })
  @IsUUID(undefined, { message: 'Id da safra inválido.' })
  harvestId!: string;

  @ApiProperty({ description: 'Nome da cultura plantada.', example: 'Soja' })
  @IsString({ message: 'O nome da cultura deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome da cultura é obrigatório.' })
  @MaxLength(100, { message: 'O nome da cultura deve ter no máximo 100 caracteres.' })
  cropName!: string;
}
