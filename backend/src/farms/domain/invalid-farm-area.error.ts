import { DomainError } from '../../common/errors/domain-error';

export class InvalidFarmAreaError extends DomainError {
  constructor(agricultableArea: number, vegetationArea: number, totalArea: number) {
    super(
      `A soma da área agricultável (${agricultableArea}) e da área de vegetação ` +
        `(${vegetationArea}) não pode ultrapassar a área total da fazenda (${totalArea}).`,
    );
  }
}
