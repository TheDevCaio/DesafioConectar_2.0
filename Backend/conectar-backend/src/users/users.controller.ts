import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { Role } from '../common/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decoratos/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll(
    @Query('role') role?: Role,
    @Query('sortBy') sortBy?: 'name' | 'createdAt',
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    return this.usersService.findAll(role, sortBy, order);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const user = await this.usersService.findOne(+id);
    if (req.user.role !== Role.ADMIN && req.user.id !== user.id) {
      throw new ForbiddenException('Access denied.');
    }
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(+id, updateUserDto, req.user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(+id, req.user);
  }
}