import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enums/role.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
      role: Role.USER, 
    });
    return this.usersRepository.save(user);
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Senha inválida');
    }

    return user; 
  }
}
