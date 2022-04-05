import { Body, Injectable } from "@nestjs/common";
import { ShortlinkDto } from '@app/modules/shortlink/dto/shortlink.dto';
import { ShortlinkEntity } from '@app/modules/shortlink/entities/shortlink.entity';

@Injectable()
export class ShortlinkService {
    constructor() {}
    async Shortlink(
        @Body() body: ShortlinkDto,
        res: ShortlinkEntity,
    ): Promise<ShortlinkEntity> {
        try {
            res.data.url = 'string';
            return res;
        } catch (error) {
            return res;
        }
    }
}
