import { AuditService, HttpResponse } from 'mvc-common-toolkit';
import { Observable, catchError, map, of } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ERR_CODE, HEADER_KEY } from '../constants';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  protected logger = new Logger(HttpResponseInterceptor.name);

  constructor(protected auditService: AuditService) {}

  public intercept(
    ctx: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const httpReq: any = ctx.switchToHttp().getRequest();
    const user = httpReq.activeUser || httpReq.user;
    const logId = ctx.switchToHttp().getRequest().headers[HEADER_KEY.LOG_ID];

    return next.handle().pipe(
      map((response: HttpResponse) => {
        if (response?.httpCode) {
          return response;
        }

        if (response?.success === false) {
          return {
            success: false,
            code: response.code,
            httpCode: response.httpCode || HttpStatus.INTERNAL_SERVER_ERROR,
            message: response.message,
          };
        }

        if (response?.success === true) {
          delete response.success;
        }

        const payload = response?.data ?? response;

        return { data: payload, success: true };
      }),
      catchError((error) => {
        this.logger.error(error.message, error.stack);

        if (!(error instanceof HttpException)) {
          return of({
            success: false,
            message: 'internal server error',
            code: ERR_CODE.INTERNAL_SERVER_ERROR,
          });
        }

        return of(error);
      }),
    );
  }
}
