import { InvalidFarmAreaError } from './invalid-farm-area.error';
import { assertValidFarmArea } from './area-rule';

describe('assertValidFarmArea', () => {
  it('não lança erro quando agricultável + vegetação é menor que a área total', () => {
    expect(() =>
      assertValidFarmArea({ totalArea: 100, agricultableArea: 40, vegetationArea: 30 }),
    ).not.toThrow();
  });

  it('não lança erro quando agricultável + vegetação é exatamente igual à área total', () => {
    expect(() =>
      assertValidFarmArea({ totalArea: 100, agricultableArea: 60, vegetationArea: 40 }),
    ).not.toThrow();
  });

  it('lança InvalidFarmAreaError quando agricultável + vegetação excede a área total', () => {
    expect(() =>
      assertValidFarmArea({ totalArea: 100, agricultableArea: 70, vegetationArea: 40 }),
    ).toThrow(InvalidFarmAreaError);
  });

  it('inclui os números do erro na mensagem', () => {
    try {
      assertValidFarmArea({ totalArea: 100, agricultableArea: 70, vegetationArea: 40 });
      fail('esperava que assertValidFarmArea lançasse um erro');
    } catch (error) {
      expect((error as Error).message).toContain('70');
      expect((error as Error).message).toContain('40');
      expect((error as Error).message).toContain('100');
    }
  });

  it('lida com áreas zeradas sem lançar erro', () => {
    expect(() =>
      assertValidFarmArea({ totalArea: 0, agricultableArea: 0, vegetationArea: 0 }),
    ).not.toThrow();
  });
});
