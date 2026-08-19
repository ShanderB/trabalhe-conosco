import { ApiProperty } from '@nestjs/swagger';

export class StateCountDto {
  @ApiProperty({ example: 'SP' })
  state!: string;

  @ApiProperty({ example: 3 })
  count!: number;
}

export class CropCountDto {
  @ApiProperty({ example: 'Soja' })
  crop!: string;

  @ApiProperty({
    example: 5,
    description: 'Quantidade de registros de plantio dessa cultura (contagem, não soma de hectares).',
  })
  count!: number;
}

export class LandUseDto {
  @ApiProperty({ example: 1200 })
  agricultable!: number;

  @ApiProperty({ example: 300 })
  vegetation!: number;
}

export class DashboardSummaryDto {
  @ApiProperty({ example: 4 })
  totalFarms!: number;

  @ApiProperty({ example: 7280 })
  totalHectares!: number;

  @ApiProperty({ type: [StateCountDto] })
  byState!: StateCountDto[];

  @ApiProperty({ type: [CropCountDto] })
  byCrop!: CropCountDto[];

  @ApiProperty({ type: LandUseDto })
  landUse!: LandUseDto;
}
