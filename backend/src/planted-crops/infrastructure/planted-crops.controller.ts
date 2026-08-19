import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePlantedCropDto } from '../application/dto/create-planted-crop.dto';
import { PlantedCropResponseDto } from '../application/dto/planted-crop-response.dto';
import { PlantedCropsService } from '../application/planted-crops.service';

@ApiTags('planted-crops')
@Controller('planted-crops')
export class PlantedCropsController {
  constructor(private readonly plantedCropsService: PlantedCropsService) {}

  @Post()
  @ApiOperation({ summary: 'Registra uma cultura plantada em uma fazenda, numa safra.' })
  create(@Body() dto: CreatePlantedCropDto): Promise<PlantedCropResponseDto> {
    return this.plantedCropsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as culturas plantadas.' })
  findAll(): Promise<PlantedCropResponseDto[]> {
    return this.plantedCropsService.findAll();
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove um registro de cultura plantada.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.plantedCropsService.remove(id);
  }
}
