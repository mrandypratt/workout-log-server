import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

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
      username: 'maria',
      password: 'guess'
    },
  ];

  async findOne(username: string): Promise<User | null> {
    console.log(`Checking for User: ${username}`)
    return this.users.find(user => user.username === username) || null;
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
