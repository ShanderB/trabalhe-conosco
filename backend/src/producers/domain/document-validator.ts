import { InvalidDocumentError } from './invalid-document.error';

export type DocumentType = 'CPF' | 'CNPJ';

export interface ValidatedDocument {
  type: DocumentType;
  digits: string;
}

const onlyDigits = (value: string): string => (value ?? '').replace(/\D/g, '');

const hasAllSameDigits = (digits: string): boolean =>
  digits.split('').every((digit) => digit === digits[0]);

export function isValidCpf(rawValue: string): boolean {
  const cpf = onlyDigits(rawValue);
  if (cpf.length !== 11 || hasAllSameDigits(cpf)) {
    return false;
  }

  const digits = cpf.split('').map(Number);

  const calcCheckDigit = (base: number[]): number => {
    let weight = base.length + 1;
    const sum = base.reduce((acc, digit) => {
      const partial = digit * weight;
      weight -= 1;
      return acc + partial;
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstCheckDigit = calcCheckDigit(digits.slice(0, 9));
  const secondCheckDigit = calcCheckDigit(digits.slice(0, 9).concat(firstCheckDigit));

  return firstCheckDigit === digits[9] && secondCheckDigit === digits[10];
}

export function isValidCnpj(rawValue: string): boolean {
  const cnpj = onlyDigits(rawValue);
  if (cnpj.length !== 14 || hasAllSameDigits(cnpj)) {
    return false;
  }

  const digits = cnpj.split('').map(Number);

  const calcCheckDigit = (base: number[]): number => {
    const weights =
      base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = base.reduce((acc, digit, index) => acc + digit * weights[index], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstCheckDigit = calcCheckDigit(digits.slice(0, 12));
  const secondCheckDigit = calcCheckDigit(digits.slice(0, 12).concat(firstCheckDigit));

  return firstCheckDigit === digits[12] && secondCheckDigit === digits[13];
}

export function validateDocument(rawValue: string): ValidatedDocument {
  const digits = onlyDigits(rawValue);

  if (digits.length === 11 && isValidCpf(digits)) {
    return { type: 'CPF', digits };
  }

  if (digits.length === 14 && isValidCnpj(digits)) {
    return { type: 'CNPJ', digits };
  }

  throw new InvalidDocumentError(rawValue);
}
