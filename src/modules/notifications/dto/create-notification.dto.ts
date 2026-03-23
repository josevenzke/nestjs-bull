import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @IsString()
  @ApiProperty({ example: 'Transaction processed successfully' })
  message: string;
}
