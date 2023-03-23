import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './routes/auth/local-auth.guard';
import { AuthService } from './routes/auth/auth.service';
import { JwtAuthGuard } from './routes/auth/jwt-auth.guard';
import { LoginCredentials } from './types/User';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    let userCredentials: LoginCredentials = {
      username: req.body.username,
      password: req.body.password,
    }

    return this.authService.login(userCredentials);
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
