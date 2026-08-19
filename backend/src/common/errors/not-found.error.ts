import { DomainError } from './domain-error';

export class NotFoundDomainError extends DomainError {
  constructor(entity: string, id: string) {
    super(`${entity} com id "${id}" não foi encontrado(a).`);
  }
}
