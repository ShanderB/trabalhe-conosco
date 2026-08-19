import { InvalidFarmAreaError } from './invalid-farm-area.error';

export interface FarmAreas {
  totalArea: number;
  agricultableArea: number;
  vegetationArea: number;
}

export function assertValidFarmArea({ totalArea, agricultableArea, vegetationArea }: FarmAreas): void {
  const usedArea = agricultableArea + vegetationArea;

  if (usedArea > totalArea) {
    throw new InvalidFarmAreaError(agricultableArea, vegetationArea, totalArea);
  }
}
