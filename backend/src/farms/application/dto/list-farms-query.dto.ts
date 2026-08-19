import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class ListFarmsQueryDto {
  @ApiPropertyOptional({ description: 'Filtra fazendas de um produtor específico.' })
  @IsOptional()
  @IsUUID(undefined, { message: 'Id do produtor inválido.' })
  producerId?: string;
}
