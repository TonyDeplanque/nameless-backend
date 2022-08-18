import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { CreateUserDto } from './users.dto';

export interface IUserViewModel {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
}

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<IUserViewModel> {
    const newUser = await this.userService.create(body);

    return UsersController.toViewModel(newUser);
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
