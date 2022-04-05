import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShortlinkDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        default: 'http://localhost.ru/shortlink/?param1&param2',
    })
    readonly fullUrl: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        default: 'http://localhost.ru/',
    })
    readonly baseUrl: string;
}
