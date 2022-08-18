import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersMongoModule } from './dependencies/mongo/users.mongo.module';
import { UsersController } from './users.controller';

@Module({
  imports: [UsersMongoModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
