import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ExchangeModule } from '../../integrations/exchange/exchange.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './transactions.repository';
import { TransactionProcessor } from './processors/transaction.processor';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'transaction-queue' }),
    ExchangeModule,
    NotificationsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository, TransactionProcessor],
})
export class TransactionsModule {}
