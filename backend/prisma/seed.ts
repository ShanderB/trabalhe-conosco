import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Populando banco de dados...');

  await prisma.plantedCrop.deleteMany();
  await prisma.harvest.deleteMany();
  await prisma.farm.deleteMany();
  await prisma.producer.deleteMany();

  const [harvest2021, harvest2022] = await Promise.all([
    prisma.harvest.create({ data: { year: 2021 } }),
    prisma.harvest.create({ data: { year: 2022 } }),
  ]);

  const joao = await prisma.producer.create({
    data: { document: '11144477735', name: 'João da Silva' },
  });

  const agroLtda = await prisma.producer.create({
    data: { document: '11222333000181', name: 'Agropecuária Boa Vista Ltda' },
  });

  const maria = await prisma.producer.create({
    data: { document: '52998224725', name: 'Maria Oliveira' },
  });

  const fazendaSantaFe = await prisma.farm.create({
    data: {
      producerId: joao.id,
      name: 'Fazenda Santa Fé',
      city: 'Ribeirão Preto',
      state: 'SP',
      totalArea: 1500,
      agricultableArea: 1000,
      vegetationArea: 400,
    },
  });

  const fazendaBoaVista = await prisma.farm.create({
    data: {
      producerId: agroLtda.id,
      name: 'Fazenda Boa Vista',
      city: 'Rio Verde',
      state: 'GO',
      totalArea: 3200,
      agricultableArea: 2500,
      vegetationArea: 600,
    },
  });

  const fazendaSaoJoao = await prisma.farm.create({
    data: {
      producerId: agroLtda.id,
      name: 'Fazenda São João',
      city: 'Sorriso',
      state: 'MT',
      totalArea: 2100,
      agricultableArea: 1700,
      vegetationArea: 350,
    },
  });

  const sitioEsperanca = await prisma.farm.create({
    data: {
      producerId: maria.id,
      name: 'Sítio Esperança',
      city: 'Uberlândia',
      state: 'MG',
      totalArea: 480,
      agricultableArea: 320,
      vegetationArea: 120,
    },
  });

  await prisma.plantedCrop.createMany({
    data: [
      { farmId: fazendaSantaFe.id, harvestId: harvest2021.id, cropName: 'Soja' },
      { farmId: fazendaSantaFe.id, harvestId: harvest2021.id, cropName: 'Milho' },
      { farmId: fazendaSantaFe.id, harvestId: harvest2022.id, cropName: 'Soja' },
      { farmId: fazendaBoaVista.id, harvestId: harvest2021.id, cropName: 'Soja' },
      { farmId: fazendaBoaVista.id, harvestId: harvest2022.id, cropName: 'Algodão' },
      { farmId: fazendaBoaVista.id, harvestId: harvest2022.id, cropName: 'Café' },
      { farmId: fazendaSaoJoao.id, harvestId: harvest2021.id, cropName: 'Milho' },
      { farmId: fazendaSaoJoao.id, harvestId: harvest2022.id, cropName: 'Soja' },
      { farmId: sitioEsperanca.id, harvestId: harvest2022.id, cropName: 'Café' },
    ],
  });

  console.log('Seed finalizado.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
