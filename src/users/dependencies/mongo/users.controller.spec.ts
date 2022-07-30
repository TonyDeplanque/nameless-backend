import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection } from 'mongoose';
import { User, UserSchema } from './user.schema';
import { UsersController } from '../../users.controller';
import { IUserRepositoryName } from '../../users.constant';
import { UsersMongoRepository } from './users.mongo.repository';
import { CreateUserDto } from '../../users.dto';
import { UsersService } from '../../users.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserSchemaName } from './users.mongo.constant';
import { UserAlreadyExistsException } from '../../exceptions/user-already-exists.exception';

describe('UserMongoController', () => {
  let userController: UsersController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  const createUserDto = {
    lastname: 'Deplanque',
    firstname: 'Tony',
    city: 'Arras',
    email: 'deplanque.tony@gmail.com',
    password: 'toto',
  } as CreateUserDto;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    const userModel = mongoConnection.model(UserSchemaName, UserSchema);

    const u = new userModel({
      lastname: 'Maurice',
      firstname: 'Robert',
      city: 'Paris',
      email: 'deplanque.tony2@gmail.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await u.save();

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: IUserRepositoryName,
          useClass: UsersMongoRepository,
        },
        { provide: getModelToken(UserSchemaName), useValue: userModel },
      ],
    }).compile();

    userController = app.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('Create User with Mongo', () => {
    it('should return the saved object', async () => {
      const createUser = await userController.createUser(createUserDto);
      expect(createUser.lastname).toBe(createUserDto.lastname);
      expect(createUser.firstname).toBe(createUserDto.firstname);
      expect(createUser.city).toBe(createUserDto.city);
      expect(createUser.email).toBe(createUserDto.email);
    });

    it('Verify throw exception if user with the same email already exists', async () => {
      await userController.createUser(createUserDto);
      await expect(async () => {
        await userController.createUser(createUserDto);
      }).rejects.toThrow(UserAlreadyExistsException);
    });
  });
});
