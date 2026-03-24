import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    return this.prisma.transaction.create({ data });
  }

  async findById(id: string) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.TransactionUncheckedUpdateInput) {
    return this.prisma.transaction.update({ where: { id }, data });
  }
}
