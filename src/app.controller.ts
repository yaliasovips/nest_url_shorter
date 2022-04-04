import { Controller, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post()
  getFullUrl(): string {
    return 'Линк';
  }
}
