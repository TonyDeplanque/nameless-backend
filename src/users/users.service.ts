import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { UsersRepositoryInterface } from './users.repository.interface';
import { CreateUserDto } from './users.dto';
import { IUserRepositoryName } from './users.constant';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUserRepositoryName)
    private userRepository: UsersRepositoryInterface,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = {
      ...createUserDto,
      createdAt: new Date(),
      password: await this.hashPassword(createUserDto.password),
    };

    return await this.userRepository.create(newUser);
  }

  protected async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
