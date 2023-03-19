import { ConsoleLogger, Injectable } from '@nestjs/common';
import { User } from 'src/types/User';

@Injectable()
export class UsersService {
  userIdCounter: number = 3;
  users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme'
    },
    {
      userId: 2,
      username: 'andy',
      password: 'yaya'
    },
  ];

  async findOne(username: string): Promise<User | null> {
    console.log(`Checking for User: ${username}`)
    let user = this.users.find(user => user.username === username);
    return user || null;
  }

  async createOne(username: string, password: string): Promise<User> {
    let user = {
      userId: this.userIdCounter,
      username: username,
      password: password
    }

    this.userIdCounter += 1;

    this.users.push(user);

    console.log("Added User:")
    console.log(user);
    
    return user;
  }
}
