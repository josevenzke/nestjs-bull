import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsUUID()
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 100.5 })
  amountBrl: number;
}
