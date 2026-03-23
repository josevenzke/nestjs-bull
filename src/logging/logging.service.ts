import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string) {
    const ctx = context || this.context || 'App';
    console.log(`[${new Date().toISOString()}] [LOG] [${ctx}] ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    const ctx = context || this.context || 'App';
    console.error(`[${new Date().toISOString()}] [ERROR] [${ctx}] ${message}`);
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: string, context?: string) {
    const ctx = context || this.context || 'App';
    console.warn(`[${new Date().toISOString()}] [WARN] [${ctx}] ${message}`);
  }

  debug(message: string, context?: string) {
    const ctx = context || this.context || 'App';
    console.debug(`[${new Date().toISOString()}] [DEBUG] [${ctx}] ${message}`);
  }

  verbose(message: string, context?: string) {
    const ctx = context || this.context || 'App';
    console.log(`[${new Date().toISOString()}] [VERBOSE] [${ctx}] ${message}`);
  }
}
