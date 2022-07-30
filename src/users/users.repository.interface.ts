import { User } from './users.model';
import { CreateUserDto } from './users.dto';

export interface UsersRepositoryInterface {
  create(newUser: CreateUserDto): Promise<User>;
  findOne(email: string): Promise<User>;
}
