import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    let user = {
      username: req.body.username,
      password: req.body.password,
    }

    console.log("Login Request for User:")
    console.log(user);
    return this.authService.login(req.body);
  }

  @Post('auth/register')
  async register(@Request() req) {
    let user = {
      username: req.body.username,
      password: req.body.password,
    }

    console.log("Registration Request for User:")
    console.log(user);

    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    let user = {
      username: req.body.username,
      password: req.body.password,
    }

    console.log("Profile Request from User:")
    console.log(user);

    return req.user;
  }
}
