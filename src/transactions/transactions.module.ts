import { Module } from '@nestjs/common';
import { LoggingModule } from '../logging/logging.module';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [LoggingModule],
  controllers: [TransactionsController],
  // TODO: Discuss in meeting — PrismaService in providers creates a separate instance per module.
  // Importing PrismaModule instead would share a single instance and connection pool.
  providers: [TransactionsService, PrismaService],
})
export class TransactionsModule {}
