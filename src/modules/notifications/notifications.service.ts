import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async create(userId: string, message: string) {
    const dto: CreateNotificationDto = { userId, message };
    return this.notificationsRepository.create(dto);
  }

  async findByUserId(userId: string) {
    return this.notificationsRepository.findByUserId(userId);
  }
}
