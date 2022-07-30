import { Module } from '@nestjs/common';
import { UsersLocalRepository } from './users.local.repository';
import { IUserRepositoryName } from '../../users.constant';

const usersRepositoryProvider = {
  provide: IUserRepositoryName,
  useClass: UsersLocalRepository,
};

@Module({
  exports: [usersRepositoryProvider],
  providers: [usersRepositoryProvider],
})
export class UsersLocalModule {}
