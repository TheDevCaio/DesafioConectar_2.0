import {
  Controller,
  Get,
  Put,
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
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decoratos/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(
    @Query('role') role?: Role,
    @Query('sortBy') sortBy?: 'name' | 'createdAt' | 'lastLogin',
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    const validSortBy = ['name', 'createdAt', 'lastLogin'] as const;
    const sortField = validSortBy.includes(sortBy as any) ? sortBy : undefined;

    const validOrder = ['ASC', 'DESC'] as const;
    const orderDirection = validOrder.includes(order as any) ? order : undefined;

    return this.usersService.findAll(role, sortField, orderDirection);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req, @Body() body: { name: string; password?: string }) {
    return this.usersService.update(req.user.id, body, req.user);
  }


  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const user = await this.usersService.findOne(+id);
    if (req.user.role !== Role.ADMIN && req.user.id !== user.id) {
      throw new ForbiddenException('Access denied.');
    }
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.usersService.update(+id, updateUserDto, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(+id, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/last-login')
  async updateLastLogin(@Param('id') id: string, @Request() req) {
    if (req.user.id !== +id && req.user.role !== Role.ADMIN) {
      throw new ForbiddenException('Access denied.');
    }
    await this.usersService.updateLastLogin(+id);
    return { message: 'Last login updated.' };
  }
}
