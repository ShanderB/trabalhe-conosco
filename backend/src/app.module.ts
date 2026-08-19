import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DashboardModule } from './dashboard/dashboard.module';
import { FarmsModule } from './farms/farms.module';
import { HarvestsModule } from './harvests/harvests.module';
import { HealthController } from './health.controller';
import { PlantedCropsModule } from './planted-crops/planted-crops.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProducersModule } from './producers/producers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProducersModule,
    FarmsModule,
    HarvestsModule,
    PlantedCropsModule,
    DashboardModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_FILTER, useClass: DomainExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
