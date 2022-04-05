import { Module } from '@nestjs/common';
import { ShortlinkModule } from "@app/modules/shortlink/Shortlink.module";

@Module({
  imports: [ShortlinkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
