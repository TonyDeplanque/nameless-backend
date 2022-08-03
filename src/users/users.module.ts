import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersMongoModule } from './dependencies/mongo/users.mongo.module';

@Module({
  imports: [UsersMongoModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
