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
import { CreateFarmDto } from '../application/dto/create-farm.dto';
import { FarmResponseDto } from '../application/dto/farm-response.dto';
import { UpdateFarmDto } from '../application/dto/update-farm.dto';
import { FarmsService } from '../application/farms.service';

@ApiTags('farms')
@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova fazenda vinculada a um produtor.' })
  create(@Body() dto: CreateFarmDto): Promise<FarmResponseDto> {
    return this.farmsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as fazendas.' })
  findAll(): Promise<FarmResponseDto[]> {
    return this.farmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma fazenda pelo id.' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<FarmResponseDto> {
    return this.farmsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de uma fazenda.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateFarmDto,
  ): Promise<FarmResponseDto> {
    return this.farmsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove uma fazenda e suas culturas plantadas.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.farmsService.remove(id);
  }
}
