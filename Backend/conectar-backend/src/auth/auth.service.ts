import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enums/role.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
      private jwtService: JwtService,
  ) {}

async register(createUserDto: CreateUserDto) {
  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);


  const role = 
    createUserDto.role && [Role.USER, Role.ADMIN].includes(createUserDto.role) 
      ? createUserDto.role 
      : Role.USER;

  const user = this.usersRepository.create({
    email: createUserDto.email,
    name: createUserDto.name,
    password: hashedPassword,
    role,
  });

  return this.usersRepository.save(user);
}

async login(email: string, password: string): Promise<{ access_token: string; user: User }> {
  const user = await this.usersRepository.findOneBy({ email });

  if (!user) {
    throw new UnauthorizedException('Usuário não encontrado');
  }

  const isPasswordMatching = await bcrypt.compare(password, user.password);
  if (!isPasswordMatching) {
    throw new UnauthorizedException('Senha inválida');
  }


  const payload = { email: user.email, sub: user.id, role: user.role };


  const access_token = this.jwtService.sign(payload);

  return {
    access_token,
    user,
  };
}
}
