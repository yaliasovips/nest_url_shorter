import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShortlinkDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        default: 'http://localhost:3000/shortlink/?param1&param2',
    })
    readonly url: string;
}
