import { InvalidDocumentError } from './invalid-document.error';
import { isValidCnpj, isValidCpf, validateDocument } from './document-validator';

describe('document-validator (CPF/CNPJ)', () => {
  describe('isValidCpf', () => {
    it.each(['11144477735', '52998224725', '111.444.777-35', '529.982.247-25'])(
      'aceita CPF válido %s',
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
    ])('rejeita CPF inválido %s', (cpf) => {
      expect(isValidCpf(cpf)).toBe(false);
    });
  });

  describe('isValidCnpj', () => {
    it.each(['11222333000181', '11.222.333/0001-81'])('aceita CNPJ válido %s', (cnpj) => {
      expect(isValidCnpj(cnpj)).toBe(true);
    });

    it.each([
      '11111111111111',
      '11222333000100',
      '11222333000182',
      '1122233300018',
      '112223330001811',
      '',
    ])('rejeita CNPJ inválido %s', (cnpj) => {
      expect(isValidCnpj(cnpj)).toBe(false);
    });
  });

  describe('validateDocument', () => {
    it('detecta um documento válido de 11 dígitos como CPF', () => {
      expect(validateDocument('11144477735')).toEqual({ type: 'CPF', digits: '11144477735' });
    });

    it('detecta um documento válido de 14 dígitos como CNPJ', () => {
      expect(validateDocument('11222333000181')).toEqual({
        type: 'CNPJ',
        digits: '11222333000181',
      });
    });

    it('remove a pontuação antes de validar', () => {
      expect(validateDocument('529.982.247-25')).toEqual({ type: 'CPF', digits: '52998224725' });
    });

    it('lança InvalidDocumentError para um CPF inválido', () => {
      expect(() => validateDocument('11111111111')).toThrow(InvalidDocumentError);
    });

    it('lança InvalidDocumentError para um CNPJ inválido', () => {
      expect(() => validateDocument('11222333000100')).toThrow(InvalidDocumentError);
    });

    it('lança InvalidDocumentError para um documento com tamanho não suportado', () => {
      expect(() => validateDocument('12345')).toThrow(InvalidDocumentError);
    });
  });
});
