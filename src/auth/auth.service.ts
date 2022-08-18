import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const validPassword = await this.userService.comparePasswords(
      password,
      user.password,
    );
    if (user && validPassword) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
