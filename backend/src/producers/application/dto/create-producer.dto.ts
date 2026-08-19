import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateProducerDto {
  @ApiProperty({
    description: 'CPF (11 dígitos) ou CNPJ (14 dígitos), com ou sem máscara.',
    example: '111.444.777-35',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11, 18)
  document!: string;

  @ApiProperty({ description: 'Nome do produtor ou razão social.', example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;
}
