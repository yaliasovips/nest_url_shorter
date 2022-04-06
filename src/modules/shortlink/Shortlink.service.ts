import { Body, Headers, Injectable, Param } from "@nestjs/common";
import { ShortlinkDto } from '@app/modules/shortlink/dto/shortlink.dto';
import { ShortlinkEntity } from '@app/modules/shortlink/entities/shortlink.entity';
import { urlValidate } from '@app/utils/urlValidate';
import { AppLogger } from "@app/modules/logger/Logger";
import * as shortid from 'shortid';

@Injectable()
export class ShortlinkService {
    constructor() {}
    async GenerateShortlink(
        body: ShortlinkDto,
        headers: Headers,
        res: ShortlinkEntity,
    ): Promise<ShortlinkEntity> {
        const { fullUrl } = body;
        const baseUrl = fullUrl.slice(0, fullUrl.lastIndexOf('/shortlink/') + 11);
        const shortID = shortid.generate();
        if(urlValidate(fullUrl)) {
            // TODO проверка в базе короткого урла
            // TODO если нет, то делаем записать в бд
            try {
                const shortUrl = baseUrl + shortID;
                res.data.url = shortUrl;
                AppLogger.log('Successful send url', {
                    request_name: '/shortlink/',
                    request_body: body,
                    request_headers: headers,
                    requestUrl: {
                        fullUrl: fullUrl,
                        baseUrl: baseUrl
                    },
                    responseShortUrl: shortUrl,
                });

                return res;
            } catch (error) {
                AppLogger.warn('Failed to send url', {
                    request_name: '/shortlink/',
                    request_body: body,
                    request_headers: headers,
                    errorText: error.info?.logMessage,
                    errorBody: error.info?.requestError?.body,
                    requestUrl: {
                        fullUrl: fullUrl,
                        baseUrl: baseUrl
                    },
                });

                res.error = 300;
                return res;
            }
        } else {
            AppLogger.warn('Failed to validate url', {
                request_name: '/shortlink/',
                request_body: body,
                request_headers: headers,
                requestUrl: {
                    fullUrl: fullUrl,
                    baseUrl: baseUrl
                },
            });

            res.error = 400;
            return res;
        }
    }

    async RedirectToFullUrl(
        params: { id: string },
        headers: Headers,
        res: ShortlinkEntity,
    ): Promise<ShortlinkEntity> {
        try {
            const shortID = params.id;
            //TODO запрос на бд на поиск нужного ключа
            return res;
        } catch(error) {
            res.error = 404;
            return res;
        }
    }
}
