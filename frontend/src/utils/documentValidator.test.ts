import { documentType, formatDocument, isValidCNPJ, isValidCPF, isValidDocument } from './documentValidator';

describe('isValidCPF', () => {
  it('aceita um CPF válido, com ou sem máscara', () => {
    expect(isValidCPF('111.444.777-35')).toBe(true);
    expect(isValidCPF('11144477735')).toBe(true);
  });

  it('rejeita CPF com dígito verificador incorreto', () => {
    expect(isValidCPF('111.444.777-30')).toBe(false);
  });

  it('rejeita CPF com todos os dígitos iguais', () => {
    expect(isValidCPF('111.111.111-11')).toBe(false);
  });

  it('rejeita CPF com tamanho incorreto', () => {
    expect(isValidCPF('123456')).toBe(false);
  });
});

describe('isValidCNPJ', () => {
  it('aceita um CNPJ válido, com ou sem máscara', () => {
    expect(isValidCNPJ('11.222.333/0001-81')).toBe(true);
    expect(isValidCNPJ('11222333000181')).toBe(true);
  });

  it('rejeita CNPJ com dígito verificador incorreto', () => {
    expect(isValidCNPJ('11.222.333/0001-00')).toBe(false);
  });

  it('rejeita CNPJ com todos os dígitos iguais', () => {
    expect(isValidCNPJ('11.111.111/1111-11')).toBe(false);
  });
});

describe('isValidDocument', () => {
  it('identifica e valida CPF pelo tamanho (11 dígitos)', () => {
    expect(isValidDocument('111.444.777-35')).toBe(true);
  });

  it('identifica e valida CNPJ pelo tamanho (14 dígitos)', () => {
    expect(isValidDocument('11.222.333/0001-81')).toBe(true);
  });

  it('rejeita documentos com tamanho que não é nem CPF nem CNPJ', () => {
    expect(isValidDocument('123')).toBe(false);
    expect(isValidDocument('')).toBe(false);
  });
});

describe('documentType', () => {
  it('retorna CPF, CNPJ ou null conforme a quantidade de dígitos', () => {
    expect(documentType('11144477735')).toBe('CPF');
    expect(documentType('11222333000181')).toBe('CNPJ');
    expect(documentType('123')).toBeNull();
  });
});

describe('formatDocument', () => {
  it('formata CPF e CNPJ com máscara padrão', () => {
    expect(formatDocument('11144477735')).toBe('111.444.777-35');
    expect(formatDocument('11222333000181')).toBe('11.222.333/0001-81');
  });
});
