import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '../errors/domain-error';
import { NotFoundDomainError } from '../errors/not-found.error';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception instanceof NotFoundDomainError ? 404 : 400;

    response.status(statusCode).json({
      statusCode,
      error: statusCode === 404 ? 'Not Found' : 'Bad Request',
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
