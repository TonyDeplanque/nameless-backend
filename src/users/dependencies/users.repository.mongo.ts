import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UsersRepositoryInterface } from '../users.repository.interface';
import { UserSchemaName } from './users.mongo.constant';

@Injectable()
export class UsersRepositoryMongo implements UsersRepositoryInterface {
  constructor(
    @InjectModel(UserSchemaName)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(newUser: User): Promise<User> {
    return await this.userModel.create(newUser);
  }
}
