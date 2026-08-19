import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class CreateHarvestDto {
  @ApiProperty({ description: 'Ano da safra.', example: 2022 })
  @IsInt({ message: 'O ano deve ser um número inteiro.' })
  @Min(1900, { message: 'O ano deve ser maior ou igual a 1900.' })
  @Max(2100, { message: 'O ano deve ser menor ou igual a 2100.' })
  year!: number;
}
