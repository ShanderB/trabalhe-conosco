import { ApiProperty } from '@nestjs/swagger';

export class ProducerResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  document!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
