import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransactions() {
    return await this.prisma.transaction.findMany();
  }

  async createTransaction(createTransactionDto: any) {
    return await this.prisma.transaction.create({
      data: createTransactionDto,
    });
  }
}
