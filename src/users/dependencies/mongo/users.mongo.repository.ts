import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UsersRepositoryInterface } from '../../users.repository.interface';
import { UserSchemaName } from './users.mongo.constant';
import { UserAlreadyExistsException } from '../../exceptions/user-already-exists.exception';

@Injectable()
export class UsersMongoRepository implements UsersRepositoryInterface {
  constructor(
    @InjectModel(UserSchemaName)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(newUser: User): Promise<User> {
    const existingUser = await this.findOne(newUser.email);
    if (existingUser) throw new UserAlreadyExistsException();

    return await this.userModel.create(newUser);
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }
}
