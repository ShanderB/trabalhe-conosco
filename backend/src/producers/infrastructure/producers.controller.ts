import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProducerDto } from '../application/dto/create-producer.dto';
import { ProducerResponseDto } from '../application/dto/producer-response.dto';
import { UpdateProducerDto } from '../application/dto/update-producer.dto';
import { ProducersService } from '../application/producers.service';

@ApiTags('producers')
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo produtor rural.' })
  create(@Body() dto: CreateProducerDto): Promise<ProducerResponseDto> {
    return this.producersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtores rurais.' })
  findAll(): Promise<ProducerResponseDto[]> {
    return this.producersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um produtor rural pelo id.' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ProducerResponseDto> {
    return this.producersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um produtor rural.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProducerDto,
  ): Promise<ProducerResponseDto> {
    return this.producersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove um produtor rural e suas fazendas.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.producersService.remove(id);
  }
}
