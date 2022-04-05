import { Module } from "@nestjs/common";
import { ShortlinkController } from "@app/modules/shortlink/Shortlink.controller";
import { ShortlinkService } from "@app/modules/shortlink/Shortlink.service";

@Module({
    imports: [],
    controllers: [ShortlinkController],
    providers: [ShortlinkService],
})
export class ShortlinkModule {}
