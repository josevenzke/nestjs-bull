import { Module } from '@nestjs/common';
import { LoggingModule } from '../logging/logging.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [LoggingModule],
  controllers: [UsersController],
  // TODO: Discuss in meeting — PrismaService in providers creates a separate instance per module.
  // Importing PrismaModule instead would share a single instance and connection pool.
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
