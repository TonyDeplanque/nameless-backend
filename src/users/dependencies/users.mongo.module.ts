import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersRepositoryMongo } from './users.repository.mongo';
import { IUserRepositoryName } from '../users.constant';
import { UserSchemaName } from './users.mongo.constant';

const usersRepositoryProvider = {
  provide: IUserRepositoryName,
  useClass: UsersRepositoryMongo,
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
