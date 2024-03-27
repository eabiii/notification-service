import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Config } from 'src/config';
// import { ClicksendMessages } from 'src/models/clicksend/clicksend.model';

export interface ClicksendResult {
  httpCode: number;
  responseCode: string;
  responseMsg: string;
  data: {
    totalPrice: number;
    totalCount: number;
    queuedCount: number;
    blockedCount: number;
    messages: Message[];
    currency: Currency;
  };
}

export interface Currency {
  currencyNameShort: string;
  currencyPrefixD: string;
  currencyPrefixC: string;
  currencyNameLong: string;
}

export interface Message {
  to: string;
  body: string;
  from: string;
  schedule: string;
  messageId: string;
  messageParts: number;
  messagePrice: string;
  customString: string;
  isSharedSystemNumber: boolean;
  country: string;
  carrier: string;
  status: string;
}

@Injectable()
export class ClicksendService {
  constructor(private httpService: HttpService) {}
  async sendSMS(messages: object): Promise<ClicksendResult> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<ClicksendResult>(
          Config.clicksendApiUrl,
          messages,
          { headers: { Authorization: `Basic ${Config.clicksendAuth}` } },
        ),
      );

      return response.data;
    } catch (error) {
      console.log('🚀 ~ ClicksendService ~ sendSMS ~ error:', error);
      return null;
    }
  }
}
