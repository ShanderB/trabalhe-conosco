import { InvalidDocumentError } from './invalid-document.error';
import { isValidCnpj, isValidCpf, validateDocument } from './document-validator';

describe('document-validator (CPF/CNPJ)', () => {
  describe('isValidCpf', () => {
    it.each(['11144477735', '52998224725', '111.444.777-35', '529.982.247-25'])(
      'accepts valid CPF %s',
      (cpf) => {
        expect(isValidCpf(cpf)).toBe(true);
      },
    );

    it.each([
      '11111111111',
      '00000000000',
      '12345678900',
      '11144477736',
      '1114447773',
      '111444777355',
      '',
    ])('rejects invalid CPF %s', (cpf) => {
      expect(isValidCpf(cpf)).toBe(false);
    });
  });

  describe('isValidCnpj', () => {
    it.each(['11222333000181', '11.222.333/0001-81'])('accepts valid CNPJ %s', (cnpj) => {
      expect(isValidCnpj(cnpj)).toBe(true);
    });

    it.each([
      '11111111111111',
      '11222333000100',
      '11222333000182',
      '1122233300018',
      '112223330001811',
      '',
    ])('rejects invalid CNPJ %s', (cnpj) => {
      expect(isValidCnpj(cnpj)).toBe(false);
    });
  });

  describe('validateDocument', () => {
    it('detects a valid 11-digit document as CPF', () => {
      expect(validateDocument('11144477735')).toEqual({ type: 'CPF', digits: '11144477735' });
    });

    it('detects a valid 14-digit document as CNPJ', () => {
      expect(validateDocument('11222333000181')).toEqual({
        type: 'CNPJ',
        digits: '11222333000181',
      });
    });

    it('strips punctuation before validating', () => {
      expect(validateDocument('529.982.247-25')).toEqual({ type: 'CPF', digits: '52998224725' });
    });

    it('throws InvalidDocumentError for an invalid CPF', () => {
      expect(() => validateDocument('11111111111')).toThrow(InvalidDocumentError);
    });

    it('throws InvalidDocumentError for an invalid CNPJ', () => {
      expect(() => validateDocument('11222333000100')).toThrow(InvalidDocumentError);
    });

    it('throws InvalidDocumentError for a document with an unsupported length', () => {
      expect(() => validateDocument('12345')).toThrow(InvalidDocumentError);
    });
  });
});
