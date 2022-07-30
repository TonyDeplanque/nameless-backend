import { Injectable } from '@nestjs/common';
import { User } from '../../users.model';
import { UsersRepositoryInterface } from '../../users.repository.interface';
import { UserAlreadyExistsException } from '../../exceptions/user-already-exists.exception';

@Injectable()
export class UsersLocalRepository implements UsersRepositoryInterface {
  protected users: User[] = [];

  async create(newUser: User): Promise<User> {
    const userAlreadyExists = this.users.find(
      (user) => newUser.email === user.email,
    );

    if (userAlreadyExists) {
      throw new UserAlreadyExistsException();
    }

    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  findOne(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return Promise.resolve(user);
  }
}
