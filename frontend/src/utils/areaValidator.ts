export interface FarmAreaInput {
  totalArea: number;
  agricultableArea: number;
  vegetationArea: number;
}

export function isValidFarmArea({ totalArea, agricultableArea, vegetationArea }: FarmAreaInput): boolean {
  if ([totalArea, agricultableArea, vegetationArea].some((value) => !Number.isFinite(value) || value < 0)) {
    return false;
  }
  return agricultableArea + vegetationArea <= totalArea;
}

export function farmAreaErrorMessage(input: FarmAreaInput): string | null {
  if ([input.totalArea, input.agricultableArea, input.vegetationArea].some((value) => !Number.isFinite(value) || value < 0)) {
    return 'Informe valores numéricos e não negativos para as áreas.';
  }
  if (!isValidFarmArea(input)) {
    return 'A soma da área agricultável com a área de vegetação não pode ser maior que a área total.';
  }
  return null;
}
