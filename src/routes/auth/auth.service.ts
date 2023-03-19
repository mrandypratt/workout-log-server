import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/types/User';
import { UsersService } from 'src/routes/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any): Promise<{}> {
    const payload = { username: user.username, sub: user.userId };

    console.log("Checking if User Exists:")
    let userInDB = await this.usersService.findOne(user.username)

    if (userInDB) {
      console.log("User Already Exists")
      return {
        userExists: true,
      };
    }

    console.log("Adding User to Database:")
    this.usersService.createOne(user.username, user.password)
    
    console.log("Sending JWT to User")
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}