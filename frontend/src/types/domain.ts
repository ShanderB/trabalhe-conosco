export interface Producer {
  id: string;
  document: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Farm {
  id: string;
  producerId: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  agricultableArea: number;
  vegetationArea: number;
  createdAt: string;
  updatedAt: string;
}

export interface Harvest {
  id: string;
  year: number;
}

export interface PlantedCrop {
  id: string;
  farmId: string;
  harvestId: string;
  cropName: string;
}

export interface DashboardSummary {
  totalFarms: number;
  totalHectares: number;
  byState: Array<{ state: string; count: number }>;
  byCrop: Array<{ crop: string; count: number }>;
  landUse: { agricultable: number; vegetation: number };
}
