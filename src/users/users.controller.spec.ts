import { Test, TestingModule } from '@nestjs/testing';
import { IUserViewModel, UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersLocalModule } from './dependencies/local/users.local.module';
import { CreateUserDto } from './users.dto';
import { User } from './users.model';
import { IUserRepositoryName } from './users.constant';
import { UsersLocalRepository } from './dependencies/local/users.local.repository';

describe('userController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: IUserRepositoryName,
          useClass: UsersLocalRepository,
        },
      ],
    }).compile();

    userController = app.get<UsersController>(UsersController);
    userService = app.get<UsersService>(UsersService);
  });

  describe('Create User', () => {
    it('should return user with view model', async () => {
      const createUserDto = {
        lastname: 'Deplanque',
        firstname: 'Tony',
        city: 'Arras',
        email: 'deplanque.tony@gmail.com',
        password: 'toto',
      } as CreateUserDto;

      const resultService = {
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      jest
        .spyOn(userService, 'create')
        .mockImplementation(async () => resultService);

      const resultController = {
        lastname: 'Deplanque',
        firstname: 'Tony',
        city: 'Arras',
        email: 'deplanque.tony@gmail.com',
      } as IUserViewModel;

      expect(await userController.createUser(createUserDto)).toStrictEqual(
        resultController,
      );
    });
  });
});
