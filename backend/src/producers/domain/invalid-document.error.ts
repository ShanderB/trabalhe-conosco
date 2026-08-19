import { DomainError } from '../../common/errors/domain-error';

export class InvalidDocumentError extends DomainError {
  constructor(document: string) {
    super(
      `Documento "${document}" é inválido. Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.`,
    );
  }
}
