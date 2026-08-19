import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateHarvestDto } from '../application/dto/create-harvest.dto';
import { HarvestResponseDto } from '../application/dto/harvest-response.dto';
import { HarvestsService } from '../application/harvests.service';

@ApiTags('harvests')
@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova safra (ano único).' })
  create(@Body() dto: CreateHarvestDto): Promise<HarvestResponseDto> {
    return this.harvestsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as safras.' })
  findAll(): Promise<HarvestResponseDto[]> {
    return this.harvestsService.findAll();
  }
}
