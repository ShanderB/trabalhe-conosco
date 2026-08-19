import { ApiProperty } from '@nestjs/swagger';

export class HarvestResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  createdAt!: Date;
}
