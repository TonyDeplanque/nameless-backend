import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { User } from '../users/users.model';
import { IUserViewModel } from '../users/users.model';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<IUserViewModel> {
    const user = await this.userService.findOne(req?.user?.username);
    return AuthController.toViewModel(user);
  }

  private static toViewModel(user: User): IUserViewModel {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      city: user.city,
    };
  }
}
