import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppLogger } from '@app/modules/logger/Logger';

@Injectable()
export class AppInterceptorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const data = context.getArgs()[0];
        // in Logging
        AppLogger.log(`Request: ${data.method} ${data.url}`,
            {
                request_name: data.url,
                session_id: data.sessionID,
                username: data.session.username,
                request_body: data.body,
                request_headers: data.headers
            });

        return next.handle()
            .pipe(
                tap((data) => {
                    // не логируем если это запрос /api/log/error
                    if(data.locals.loggingStatus === 'Logging Error') {
                        return;
                    }
                    const loggingObject: { [key: string]: string | { [key: string]: string | number } } = {
                        request_name: data.req.url,
                        session_id: data.req.sessionID,
                        username: data.req.session.username,
                        response: data.locals.responseBody
                    };
                    AppLogger.log(data.locals.loggingStatus, loggingObject);
                })
            )

            .pipe(
                catchError((error) => {

                        if(error.status === 400) {
                            const loggingObject: any = {
                                request_name: data.res.req.originalUrl,
                                request_body: data.body,
                                session_id: data.res.req.sessionID,
                                username: data.res.req.session.username,
                                errorMessage: error.response.message.join(', '),
                            };

                            // out Bad Request Logging
                            AppLogger.log(error.response.error, loggingObject);

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
