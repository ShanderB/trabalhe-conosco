import { farmAreaErrorMessage, isValidFarmArea } from './areaValidator';

describe('isValidFarmArea', () => {
  it('aceita quando agricultável + vegetação é igual à área total', () => {
    expect(isValidFarmArea({ totalArea: 100, agricultableArea: 60, vegetationArea: 40 })).toBe(true);
  });

  it('aceita quando agricultável + vegetação é menor que a área total', () => {
    expect(isValidFarmArea({ totalArea: 100, agricultableArea: 30, vegetationArea: 20 })).toBe(true);
  });

  it('rejeita quando agricultável + vegetação ultrapassa a área total', () => {
    expect(isValidFarmArea({ totalArea: 100, agricultableArea: 70, vegetationArea: 40 })).toBe(false);
  });

  it('rejeita valores negativos', () => {
    expect(isValidFarmArea({ totalArea: 100, agricultableArea: -10, vegetationArea: 20 })).toBe(false);
  });

  it('rejeita valores não numéricos (NaN)', () => {
    expect(isValidFarmArea({ totalArea: NaN, agricultableArea: 10, vegetationArea: 20 })).toBe(false);
  });
});

describe('farmAreaErrorMessage', () => {
  it('retorna null quando a área é válida', () => {
    expect(farmAreaErrorMessage({ totalArea: 100, agricultableArea: 60, vegetationArea: 40 })).toBeNull();
  });

  it('retorna mensagem de soma inválida quando a soma ultrapassa o total', () => {
    expect(farmAreaErrorMessage({ totalArea: 100, agricultableArea: 70, vegetationArea: 40 })).toMatch(/não pode ser maior/i);
  });

  it('retorna mensagem de valores inválidos para números negativos', () => {
    expect(farmAreaErrorMessage({ totalArea: 100, agricultableArea: -1, vegetationArea: 5 })).toMatch(/não negativos/i);
  });
});
