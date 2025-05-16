import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { User } from '../users/entities/user.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('inactive-users')
  async getInactiveUsers(): Promise<User[]> {
    return this.notificationsService.findInactiveUsers();
  }
}