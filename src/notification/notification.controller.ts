import {
  Body,
  Controller,
  Post,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClicksendService } from '../notification/sms/clicksend/clicksend.service';
import {
  EmailData,
  MailersendService,
} from '../notification/email/mailersend/mailersend.service';
@Controller('/api/v1/notification')
export class NotificationController {
  constructor(
    private readonly clicksendService: ClicksendService,
    private readonly mailersendService: MailersendService,
  ) {}

  @Post('sendSMS')
  async sendSMSNotification(
    @Body() body: { channel: string; content: object | EmailData },
    @Res() res,
  ): Promise<any> {
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
    }
  }

  @Post('sendEmail')
  async sendEmailNotification(
    @Body() body: { channel: string; content: EmailData },
    @Res() res,
  ): Promise<any> {
    if (!body.content) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
    try {
      const response = await this.mailersendService.sendEmail(body.content);
      if (response) {
        return res.status(HttpStatus.CREATED).json({
          statusCode: HttpStatus.ACCEPTED,
          message: 'Email notification sent successfully',
        });
      }
    } catch (error) {
      throw new HttpException(
        'Failed to send SMS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
