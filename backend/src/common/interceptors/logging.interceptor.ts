import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startedAt = Date.now();

    return next.handle().pipe(
      tap({
        next: () => this.log(request, response.statusCode, startedAt),
        error: (error: { status?: number }) =>
          this.log(request, error?.status ?? 500, startedAt),
      }),
    );
  }

  private log(request: Request, statusCode: number, startedAt: number): void {
    const durationMs = Date.now() - startedAt;
    this.logger.log(
      JSON.stringify({
        method: request.method,
        path: request.originalUrl,
        statusCode,
        durationMs,
        timestamp: new Date().toISOString(),
      }),
    );
  }
}
