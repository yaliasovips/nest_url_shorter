import { Controller, Body, Param, Post, Get, Req, Res, UsePipes, ValidationPipe, Headers } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ShortlinkDto } from '@app/modules/shortlink/dto/shortlink.dto';
import { ShortlinkEntity } from '@app/modules/shortlink/entities/shortlink.entity';
import { ShortlinkService } from "@app/modules/shortlink/Shortlink.service";

@ApiBearerAuth()
@ApiTags('shortlink')
@Controller('/shortlink/')
export class ShortlinkController {
    constructor(private shortlinkService: ShortlinkService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiBody( {type: ShortlinkDto} )
    @ApiOperation( {summary: 'Shortlink'} )
    @ApiResponse( {status: 201, description: 'Successful operation.', type: ShortlinkEntity} )
    @ApiResponse( {status: 300, description: 'Server Error.'} )
    @ApiResponse( {status: 400, description: 'Validate Error'} )
    async GenerateShortlink(
        @Body() body: ShortlinkDto,
        @Headers() headers: Headers,
        @Res() response: Response,
    ): Promise<Response<ShortlinkEntity>> {
        const data: ShortlinkEntity = {
            error: 0,
            data: {},
        }
        const res = await this.shortlinkService.GenerateShortlink(body, headers, data);
        return response.json(res);
    }

    @Get(':id')
    @ApiOperation( {summary: 'Shortlink'} )
    @ApiResponse( {status: 201, description: 'Successful operation.', type: ShortlinkEntity} )
    @ApiResponse( {status: 300, description: 'Server Error.'} )
    @ApiResponse( {status: 400, description: 'Validate Error'} )
    async RedirectToFullUrl(
        @Param() params: { id: string },
        @Headers() headers: Headers,
        @Res() response: Response,
    ): Promise<Response<void>> {
        const data: ShortlinkEntity = {
            error: 0,
            data: {},
        }
        const res = await this.shortlinkService.RedirectToFullUrl(params, headers, data);
        return response.json(res);
    }
}
