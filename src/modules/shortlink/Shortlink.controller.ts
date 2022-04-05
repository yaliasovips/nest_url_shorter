import { Controller, Body, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ShortlinkDto } from '@app/modules/shortlink/dto/shortlink.dto';
import { ShortlinkEntity } from '@app/modules/shortlink/entities/shortlink.entity';
import { ShortlinkService } from "@app/modules/shortlink/Shortlink.service";

@ApiBearerAuth()
@ApiTags('shortlink')
@Controller('/shortlink')
export class ShortlinkController {
    constructor(private shortlinkService: ShortlinkService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiBody( {type: ShortlinkDto} )
    @ApiOperation( {summary: 'Shortlink'} )
    @ApiResponse( {status: 201, description: 'Successful operation.', type: ShortlinkEntity} )
    @ApiResponse( {status: 300, description: 'Server Error.'} )
    @ApiResponse( {status: 400, description: 'Validate Error'} )
    async Shortlink(
        @Body() body: ShortlinkDto,
        @Res() response: Response,
    ): Promise<Response<ShortlinkEntity>> {
        const data: ShortlinkEntity = {
            error: 0,
            data: {},
        }
        const res = await this.shortlinkService.Shortlink(body, data);
        return response.json(res);
    }
}
