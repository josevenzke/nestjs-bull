import { ApiProperty } from '@nestjs/swagger';

export class NotificationResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ example: 'Transaction processed successfully' })
  message: string;

  @ApiProperty({ example: false })
  read: boolean;

  @ApiProperty({ example: '2026-03-23T12:00:00.000Z' })
  createdAt: Date;
}
