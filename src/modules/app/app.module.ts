import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ShortlinkModule } from "@app/modules/shortlink/Shortlink.module";
import { AppInterceptorInterceptor } from '@app/modules/app/AppInterceptor.interceptor';

@Module({
  imports: [ShortlinkModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptorInterceptor,
    },
  ],
})
export class AppModule {}
