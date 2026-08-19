import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { DomainExceptionFilter } from '../src/common/filters/domain-exception.filter';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Fluxo de Produtor + Fazenda (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const validCpf = '111.444.777-35';
  const validCpfDigits = '11144477735';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
    );
    app.useGlobalFilters(new DomainExceptionFilter());
    await app.init();

    prisma = moduleFixture.get(PrismaService);
    await prisma.producer.deleteMany({ where: { document: validCpfDigits } });
  });

  afterAll(async () => {
    await prisma.producer.deleteMany({ where: { document: validCpfDigits } });
    await app.close();
  });

  it('rejeita um produtor com documento inválido (400)', async () => {
    await request(app.getHttpServer())
      .post('/api/producers')
      .send({ document: '111.444.777-36', name: 'Documento Inválido' })
      .expect(400);
  });

  it('cria um produtor com CPF válido e depois uma fazenda para esse produtor', async () => {
    const producerResponse = await request(app.getHttpServer())
      .post('/api/producers')
      .send({ document: validCpf, name: 'João da Silva (e2e)' })
      .expect(201);

    expect(producerResponse.body).toMatchObject({
      document: validCpfDigits,
      name: 'João da Silva (e2e)',
    });
    expect(producerResponse.body.id).toEqual(expect.any(String));

    const producerId = producerResponse.body.id;

    const farmResponse = await request(app.getHttpServer())
      .post('/api/farms')
      .send({
        producerId,
        name: 'Fazenda E2E',
        city: 'Campinas',
        state: 'SP',
        totalArea: 100,
        agricultableArea: 60,
        vegetationArea: 30,
      })
      .expect(201);

    expect(farmResponse.body).toMatchObject({
      producerId,
      name: 'Fazenda E2E',
      city: 'Campinas',
      state: 'SP',
      totalArea: 100,
      agricultableArea: 60,
      vegetationArea: 30,
    });

    const getFarmResponse = await request(app.getHttpServer())
      .get(`/api/farms/${farmResponse.body.id}`)
      .expect(200);
    expect(getFarmResponse.body.id).toEqual(farmResponse.body.id);

    await request(app.getHttpServer()).delete(`/api/producers/${producerId}`).expect(204);
  });

  it('rejeita uma fazenda onde área agricultável + vegetação excede a área total (400)', async () => {
    const producerResponse = await request(app.getHttpServer())
      .post('/api/producers')
      .send({ document: validCpf, name: 'João da Silva (e2e area)' })
      .expect(201);

    const producerId = producerResponse.body.id;

    await request(app.getHttpServer())
      .post('/api/farms')
      .send({
        producerId,
        name: 'Fazenda Área Inválida',
        city: 'Campinas',
        state: 'SP',
        totalArea: 100,
        agricultableArea: 80,
        vegetationArea: 30,
      })
      .expect(400);

    await request(app.getHttpServer()).delete(`/api/producers/${producerId}`).expect(204);
  });
});
