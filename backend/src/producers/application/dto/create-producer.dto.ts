import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateProducerDto {
  @ApiProperty({
    description: 'CPF (11 dígitos) ou CNPJ (14 dígitos), com ou sem máscara.',
    example: '111.444.777-35',
  })
  @IsString({ message: 'O documento deve ser um texto.' })
  @IsNotEmpty({ message: 'O documento é obrigatório.' })
  @Length(11, 18, { message: 'O documento deve ter entre 11 e 18 caracteres.' })
  document!: string;

  @ApiProperty({ description: 'Nome do produtor ou razão social.', example: 'João da Silva' })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name!: string;
}
