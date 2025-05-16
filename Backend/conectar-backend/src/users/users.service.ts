import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role, User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || Role.USER,
    });
    return this.usersRepository.save(user);
  }

  async findAll(filterRole?: Role, sortBy?: keyof User, order: 'ASC' | 'DESC' = 'ASC'): Promise<User[]> {
    const query = this.usersRepository.createQueryBuilder('user');

    if (filterRole) {
      query.andWhere('user.role = :role', { role: filterRole });
    }

    if (sortBy && ['name', 'createdAt'].includes(sortBy)) {
      query.orderBy(`user.${sortBy}`, order);
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto, requester: User): Promise<User> {
    const user = await this.findOne(id);

    // Só admin pode editar outro usuário
    // Usuário comum só pode editar ele mesmo
    if (requester.role !== Role.ADMIN && requester.id !== user.id) {
      throw new ForbiddenException('You do not have permission to update this user.');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  async remove(id: number, requester: User): Promise<void> {
    const user = await this.findOne(id);

    if (requester.role !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can delete users.');
    }

    await this.usersRepository.delete(id);
  }
}