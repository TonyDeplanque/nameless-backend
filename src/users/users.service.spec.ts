import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { IUserRepositoryName } from './users.constant';
import { UsersLocalRepository } from './dependencies/local/users.local.repository';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { User } from './users.model';

describe('userController', () => {
  let userService: UsersService;
  const createUserDto = {
    lastname: 'Deplanque',
    firstname: 'Tony',
    city: 'Arras',
    email: 'deplanque.tony@gmail.com',
    password: 'toto',
  } as CreateUserDto;

  let userAlreadyExist;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: IUserRepositoryName,
          useClass: UsersLocalRepository,
        },
      ],
    }).compile();

    userService = app.get<UsersService>(UsersService);
    userAlreadyExist = await userService.create({
      lastname: 'Maurice',
      firstname: 'Robert',
      city: 'Paris',
      email: 'deplanque.tony2@gmail.com',
      password: 'password',
    });
  });

  describe('Create User', () => {
    it('should return the saved object', async () => {
      const createUser = await userService.create(createUserDto);
      expect(createUser.lastname).toBe(createUserDto.lastname);
      expect(createUser.firstname).toBe(createUserDto.firstname);
      expect(createUser.city).toBe(createUserDto.city);
      expect(createUser.email).toBe(createUserDto.email);
      expect(createUser.password).not.toBeNull();
      expect(createUser.updatedAt).not.toBeNull();
      expect(createUser.createdAt).not.toBeNull();
    });

    it('Verify the password is correctly hashed', async () => {
      const serviceResult = await userService.create(createUserDto);

      expect(
        await userService.comparePassword(
          createUserDto.password,
          serviceResult.password,
        ),
      ).toBeTruthy();
    });

    it('Verify throw exception if user with the same email already exists', async () => {
      await userService.create(createUserDto);
      await expect(async () => {
        await userService.create(createUserDto);
      }).rejects.toThrow(UserAlreadyExistsException);
    });

    it('Verify retrieve the good user with email address', async () => {
      await expect(await userService.findOne(userAlreadyExist.email)).toBe(
        userAlreadyExist,
      );
    });
  });
});
