import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersMongoRepository } from './users.mongo.repository';
import { IUserRepositoryName } from '../../users.constant';
import { UserSchemaName } from './users.mongo.constant';

const usersRepositoryProvider = {
  provide: IUserRepositoryName,
  useClass: UsersMongoRepository,
};

const UserMongooseFeature = MongooseModule.forFeature([
  { name: UserSchemaName, schema: UserSchema },
]);

@Module({
  imports: [UserMongooseFeature],
  exports: [UserMongooseFeature, usersRepositoryProvider],
  providers: [usersRepositoryProvider],
})
export class UsersMongoModule {}
