import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Config } from 'src/config';
import { SmsDTO } from '../../../models/sms/sms.dto';

export interface ClicksendResult {
  httpCode: number;
  responseCode: string;
  responseMsg: string;
  data: {
    totalPrice: number;
    totalCount: number;
    queuedCount: number;
    blockedCount: number;
    messages: SmsDTO[];
    currency: Currency;
  };
}

export interface Currency {
  currencyNameShort: string;
  currencyPrefixD: string;
  currencyPrefixC: string;
  currencyNameLong: string;
}

@Injectable()
export class ClicksendService {
  constructor(private httpService: HttpService) {}
  async sendSMS(data: SmsDTO): Promise<ClicksendResult> {
    try {
      const messageToSend = [];
      messageToSend.push({
        source: 'php',
        body: data.body,
        to: data.to,
      });
      const response = await firstValueFrom(
        this.httpService.post<ClicksendResult>(
          Config.clicksendApiUrl,
          { messages: messageToSend },
          { headers: { Authorization: `Basic ${Config.clicksendAuth}` } },
        ),
      );

      return response.data;
    } catch (error) {
      return null;
    }
  }
}
