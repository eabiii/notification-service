import {
  Body,
  Controller,
  Post,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClicksendService } from '../notification/sms/clicksend/clicksend.service';
@Controller('/api/v1/notification')
export class NotificationController {
  constructor(private readonly clicksendService: ClicksendService) {}

  @Post('send')
  async sendSMSNotification(
    @Body() body: { channel: string; content: object },
    @Res() res,
  ): Promise<any> {
    console.log('Sending SMS notification to', JSON.stringify(body));
    if (!body.channel || !body.content) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    if (body.channel === 'sms') {
      try {
        const smsData = await this.clicksendService.sendSMS(body.content);
        if (smsData) {
          return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'SMS notification sent successfully',
          });
        }
      } catch (error) {
        throw new HttpException(
          'Failed to send SMS',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Invalid channel', HttpStatus.BAD_REQUEST);
    }
  }
}
