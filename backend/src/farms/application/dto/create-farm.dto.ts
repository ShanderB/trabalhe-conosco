import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Length, Min } from 'class-validator';

export class CreateFarmDto {
  @ApiProperty({ description: 'Id do produtor dono da fazenda.' })
  @IsUUID(undefined, { message: 'Id do produtor inválido.' })
  producerId!: string;

  @ApiProperty({ example: 'Fazenda Santa Fé' })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name!: string;

  @ApiProperty({ example: 'Ribeirão Preto' })
  @IsString({ message: 'A cidade deve ser um texto.' })
  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  city!: string;

  @ApiProperty({ description: 'Sigla da UF, 2 letras.', example: 'SP' })
  @IsString({ message: 'O estado deve ser um texto.' })
  @Length(2, 2, { message: 'O estado deve ter exatamente 2 letras.' })
  state!: string;

  @ApiProperty({ description: 'Área total da fazenda, em hectares.', example: 1500 })
  @IsNumber({}, { message: 'A área total deve ser um número.' })
  @IsPositive({ message: 'A área total deve ser maior que zero.' })
  totalArea!: number;

  @ApiProperty({ description: 'Área agricultável, em hectares.', example: 1000 })
  @IsNumber({}, { message: 'A área agricultável deve ser um número.' })
  @Min(0, { message: 'A área agricultável não pode ser negativa.' })
  agricultableArea!: number;

  @ApiProperty({ description: 'Área de vegetação, em hectares.', example: 400 })
  @IsNumber({}, { message: 'A área de vegetação deve ser um número.' })
  @Min(0, { message: 'A área de vegetação não pode ser negativa.' })
  vegetationArea!: number;
}
