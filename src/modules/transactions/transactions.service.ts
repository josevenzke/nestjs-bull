import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Decimal } from '@prisma/client/runtime/library';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    @InjectQueue('transaction-queue') private readonly transactionQueue: Queue,
  ) {}

  async create(dto: CreateTransactionDto) {
    const transaction = await this.transactionsRepository.create({
      userId: dto.userId,
      amountBrl: new Decimal(dto.amountBrl),
    });

    await this.transactionQueue.add('process-transaction', {
      transactionId: transaction.id,
      userId: dto.userId,
      amountBrl: dto.amountBrl,
    });

    return transaction;
  }

  async findById(id: string) {
    const transaction = await this.transactionsRepository.findById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction ${id} not found`);
    }
    return transaction;
  }
}
