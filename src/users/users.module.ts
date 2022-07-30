import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersMongoModule } from './dependencies/mongo/users.mongo.module';

@Module({
  imports: [UsersMongoModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
