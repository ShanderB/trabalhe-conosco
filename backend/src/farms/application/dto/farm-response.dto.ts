import { ApiProperty } from '@nestjs/swagger';

export class FarmResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  producerId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  state!: string;

  @ApiProperty()
  totalArea!: number;

  @ApiProperty()
  agricultableArea!: number;

  @ApiProperty()
  vegetationArea!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
