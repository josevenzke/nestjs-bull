import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TransactionStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { TransactionsRepository } from '../transactions.repository';
import { ExchangeService } from '../../../integrations/exchange/exchange.service';
import { NotificationsService } from '../../notifications/notifications.service';

interface ProcessTransactionData {
  transactionId: string;
  userId: string;
  amountBrl: number;
}

@Processor('transaction-queue')
export class TransactionProcessor extends WorkerHost {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly exchangeService: ExchangeService,
    private readonly notificationsService: NotificationsService,
  ) {
    super();
  }

  async process(job: Job<ProcessTransactionData>) {
    const { transactionId, userId, amountBrl } = job.data;

    try {
      const exchangeRate = await this.exchangeService.getUsdBrlRate();
      const amountUsd = amountBrl / exchangeRate;

      await this.transactionsRepository.update(transactionId, {
        amountUsd: new Decimal(amountUsd),
        exchangeRate: new Decimal(exchangeRate),
        status: TransactionStatus.PROCESSED,
      });

      await this.notificationsService.create(
        userId,
        `Transaction ${transactionId} processed: R$${amountBrl} = $${amountUsd.toFixed(2)} (rate: ${exchangeRate})`,
      );
    } catch (error) {
      await this.transactionsRepository.update(transactionId, {
        status: TransactionStatus.FAILED,
      });

      await this.notificationsService.create(
        userId,
        `Transaction ${transactionId} failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );

      throw error; // rethrow so BullMQ retries (up to 3 attempts from defaultJobOptions)
    }
  }
}
