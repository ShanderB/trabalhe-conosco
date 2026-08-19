import { ApiProperty } from '@nestjs/swagger';

export class PlantedCropResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  farmId!: string;

  @ApiProperty()
  harvestId!: string;

  @ApiProperty()
  cropName!: string;

  @ApiProperty()
  createdAt!: Date;
}
