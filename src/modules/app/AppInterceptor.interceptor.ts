import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppLogger } from '@app/modules/logger/Logger';

@Injectable()
export class AppInterceptorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const data = context.getArgs()[0];
        // in Logging
        AppLogger.log(`Request: ${data.method} ${data.url}`,
            {
                request_name: data.url,
                request_body: data.body,
                request_headers: data.headers
            });

        return next.handle()
            .pipe(
                catchError((error) => {
                    if(error.status === 400) {
                        const loggingObject: any = {
                            request_name: data.res.req.originalUrl,
                            request_body: data.body,
                            errorMessage: error.response.message.join(', '),
                        };

                        // out Bad Request Logging
                        AppLogger.log(`${error.response.error}, ${error.response.message.join(', ')}`, loggingObject);

                        return throwError(() => new BadRequestException({
                            error: error.status,
                            errorMessage: error.response.message,
                        }));
                    }

                    return throwError(error);
                }
            ));
    }
}
