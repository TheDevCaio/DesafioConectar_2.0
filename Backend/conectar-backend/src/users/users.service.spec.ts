import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, Role } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const mockUser: User = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: '$2b$10$hashedpassword',
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });
it('should create user with hashed password', async () => {
  const bcryptHashMock = jest.spyOn(bcrypt, 'hash') as unknown as jest.Mock<Promise<string>, [string, number]>;
  bcryptHashMock.mockResolvedValue('hashedpassword');

  (repo.save as jest.Mock).mockImplementation(async (user: User) => ({
    ...user,
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const createUserDto = {
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
    role: Role.USER,
  };

  const result = await service.create(createUserDto);

  expect(bcryptHashMock).toHaveBeenCalledWith('123456', 10);
  expect(repo.save).toHaveBeenCalledWith(expect.objectContaining({
    password: 'hashedpassword',
    role: Role.USER,
  }));
  expect(result).toMatchObject({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword',
    role: Role.USER,
  });
})});