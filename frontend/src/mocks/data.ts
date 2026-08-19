import { generateId } from '../utils/id';
import type { DashboardSummary, Farm, Harvest, PlantedCrop, Producer } from '../types/domain';

const NOW = new Date().toISOString();

const producer1: Producer = {
  id: 'e2d6b9d0-1c1a-4a1e-9c2a-000000000001',
  document: '11144477735',
  name: 'João da Silva',
  createdAt: NOW,
  updatedAt: NOW,
};

const producer2: Producer = {
  id: 'e2d6b9d0-1c1a-4a1e-9c2a-000000000002',
  document: '11222333000181',
  name: 'Agropecuária Boa Vista Ltda',
  createdAt: NOW,
  updatedAt: NOW,
};

const farm1: Farm = {
  id: 'f1a2b3c4-0000-0000-0000-000000000001',
  producerId: producer1.id,
  name: 'Fazenda Santa Fé',
  city: 'Ribeirão Preto',
  state: 'SP',
  totalArea: 500,
  agricultableArea: 350,
  vegetationArea: 100,
  createdAt: NOW,
  updatedAt: NOW,
};

const farm2: Farm = {
  id: 'f1a2b3c4-0000-0000-0000-000000000002',
  producerId: producer2.id,
  name: 'Fazenda Boa Vista',
  city: 'Rio Verde',
  state: 'GO',
  totalArea: 1200,
  agricultableArea: 900,
  vegetationArea: 250,
  createdAt: NOW,
  updatedAt: NOW,
};

const harvest2023: Harvest = { id: 'a1000000-0000-0000-0000-000000002023', year: 2023 };
const harvest2024: Harvest = { id: 'a1000000-0000-0000-0000-000000002024', year: 2024 };

const crop1: PlantedCrop = {
  id: 'c1000000-0000-0000-0000-000000000001',
  farmId: farm1.id,
  harvestId: harvest2024.id,
  cropName: 'Soja',
};

const crop2: PlantedCrop = {
  id: 'c1000000-0000-0000-0000-000000000002',
  farmId: farm2.id,
  harvestId: harvest2024.id,
  cropName: 'Milho',
};

export const db = {
  producers: [producer1, producer2] as Producer[],
  farms: [farm1, farm2] as Farm[],
  harvests: [harvest2023, harvest2024] as Harvest[],
  plantedCrops: [crop1, crop2] as PlantedCrop[],
};

export function resetDb(): void {
  db.producers = [producer1, producer2];
  db.farms = [farm1, farm2];
  db.harvests = [harvest2023, harvest2024];
  db.plantedCrops = [crop1, crop2];
}

export function timestamps() {
  const now = new Date().toISOString();
  return { createdAt: now, updatedAt: now };
}

export { generateId };

export function computeDashboardSummary(): DashboardSummary {
  const totalFarms = db.farms.length;
  const totalHectares = db.farms.reduce((sum, farm) => sum + farm.totalArea, 0);

  const byStateMap = new Map<string, number>();
  for (const farm of db.farms) {
    byStateMap.set(farm.state, (byStateMap.get(farm.state) ?? 0) + 1);
  }

  const byCropMap = new Map<string, number>();
  for (const crop of db.plantedCrops) {
    byCropMap.set(crop.cropName, (byCropMap.get(crop.cropName) ?? 0) + 1);
  }

  const agricultable = db.farms.reduce((sum, farm) => sum + farm.agricultableArea, 0);
  const vegetation = db.farms.reduce((sum, farm) => sum + farm.vegetationArea, 0);

  return {
    totalFarms,
    totalHectares,
    byState: Array.from(byStateMap.entries()).map(([state, count]) => ({ state, count })),
    byCrop: Array.from(byCropMap.entries()).map(([crop, count]) => ({ crop, count })),
    landUse: { agricultable, vegetation },
  };
}
