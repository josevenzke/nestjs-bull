import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @ApiProperty({ example: 'user-123' })
  userId: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 100 })
  amountBrl: number;
}
