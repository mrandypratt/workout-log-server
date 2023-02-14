import { Controller, Post, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  checkAuth(@Req() request: Request): string {
    console.log(request.body);
    return 'Hello From Auth';
  }
}
