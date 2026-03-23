import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface AwesomeApiResponse {
  USDBRL: {
    bid: string;
  };
}

@Injectable()
export class ExchangeService {
  constructor(private readonly httpService: HttpService) {}

  async getUsdBrlRate(): Promise<number> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<AwesomeApiResponse>(
          `${process.env.EXCHANGE_API_URL}/json/last/USD-BRL`,
        ),
      );

      return parseFloat(data.USDBRL.bid);
    } catch {
      throw new HttpException(
        'Failed to fetch exchange rate from AwesomeAPI',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
