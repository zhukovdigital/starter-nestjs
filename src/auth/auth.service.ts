import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findSingleUser(email);
    if (user) {
      return user;
    }
    return null;
  }

  async validateUserToken(token: string): Promise<any> {
    return this.jwtService.decode(token.split(' ')[1]);
  }

  async login(user: { email: string }) {
    const payload = { email: user.email };
    const foundUser = await this.usersService.findSingleUser(user.email);
    return {
      token: this.jwtService.sign(payload),
      user: foundUser,
    };
  }

  async signUp(user: User) {
    const payload = { email: user.email };
    const createdUser = await this.usersService.createUser(user);
    return {
      token: this.jwtService.sign(payload),
      user: createdUser,
    };
  }
}
