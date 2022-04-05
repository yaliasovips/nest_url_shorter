import { ApiProperty } from '@nestjs/swagger';

export class ShortlinkEntity {
    @ApiProperty({
        example: 0,
        description: 'example error'
    })
    error: number;

    @ApiProperty({
        example: {
            url: 'http://localhost.ru/SHORTLINK',
        },
        description: 'example of egotoken',
    })
    data?: {
        url?: string,
    };
}
