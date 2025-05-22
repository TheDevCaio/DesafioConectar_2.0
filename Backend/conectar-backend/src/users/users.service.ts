import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(
    role?: Role,
    sortBy?: 'name' | 'createdAt' | 'lastLogin',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<User[]> {
    const query = this.usersRepository.createQueryBuilder('user');

    if (role) {
      query.where('user.role = :role', { role });
    }

    if (sortBy) {

      query.orderBy(`user.${sortBy}`, order);
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

 async findById(id: number): Promise<User | null> {
  return this.usersRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || Role.USER,

    });

    return this.usersRepository.save(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    requesterUser: User,
  ): Promise<User> {
    const user = await this.findOne(id);

    if (requesterUser.role !== Role.ADMIN && requesterUser.id !== id) {
      throw new BadRequestException('Access denied');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
 
      const emailExists = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (emailExists) {
        throw new BadRequestException('Email already in use');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    } else {
      delete updateUserDto.password; 
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  async remove(id: number, requesterUser: User): Promise<void> {
    if (requesterUser.role !== Role.ADMIN && requesterUser.id !== id) {
      throw new BadRequestException('Access denied');
    }
    await this.usersRepository.delete(id);
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.usersRepository.update(id, { lastLogin: new Date() });
  }

}
