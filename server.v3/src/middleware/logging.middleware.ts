import { Inject, Logger, LoggerService, NestMiddleware } from '@nestjs/common';
import { createHash } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl: url } = request;

    // X-Forwarded-For 헤더 또는 request.ip를 사용하여 IP를 가져옴
    const forwarded = request.headers['x-forwarded-for'];
    let ip: any;
    if (typeof forwarded === 'string') {
      ip = forwarded;
    } else if (Array.isArray(forwarded)) {
      ip = forwarded[0];
    } else {
      ip = null;
    }

    ip = ip || request.ip;

    // IP 주소를 해싱하여 4자리 사용자 번호를 생성합니다.
    const hash = createHash('md5').update(ip).digest('hex');
    const userNumber = hash.substring(0, 4);

    const startTime = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const duration = Date.now() - startTime;

      this.logger.log(
        `[${userNumber}]${statusCode} ${duration}ms ${method} ${url}-${ip} ${contentLength}`,
      );
    });

    next();
  }
}
