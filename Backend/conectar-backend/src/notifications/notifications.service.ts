import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findInactiveUsers(): Promise<User[]> {
    const date30DaysAgo = new Date();
    date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.updatedAt < :date', { date: date30DaysAgo.toISOString() })
      .getMany();
  }
}