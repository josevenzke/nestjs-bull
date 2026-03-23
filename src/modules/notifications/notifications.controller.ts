import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { NotificationResponseDto } from './dto/notification-response.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':userId')
  @ApiOkResponse({ type: [NotificationResponseDto] })
  findByUserId(@Param('userId') userId: string) {
    return this.notificationsService.findByUserId(userId);
  }
}
