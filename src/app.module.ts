import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingModule } from './logging/logging.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, LoggingModule, TransactionsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
