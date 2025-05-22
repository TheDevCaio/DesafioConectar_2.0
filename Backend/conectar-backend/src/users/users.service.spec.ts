import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Role } from 'src/common/enums/role.enum';
const bcrypt = require('bcrypt');
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
    lastLogin: null,
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
    const bcryptHashMock = jest.spyOn(bcrypt, 'hash') as jest.Mock<Promise<string>, [string, number]>;
    bcryptHashMock.mockResolvedValue('hashedpassword');

    (repo.save as jest.Mock).mockImplementation(async (user: User) => ({
      ...user,
      id: 1,
      createdAt: new Date(),
      lastLogin: null,
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

    
  });



  

  
});

