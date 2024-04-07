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
import { OtpService } from './otp/otp.service';
import { OtpDTO } from '../models/otp/otp.dto';
import { SmsDTO } from '../models/sms/sms.dto';

@Controller('/api/v1/notification')
export class NotificationController {
  constructor(
    private readonly clicksendService: ClicksendService,
    private readonly mailersendService: MailersendService,
    private readonly otpService: OtpService,
  ) {}

  @Post('sendSMS')
  async sendSMSNotification(@Body() body: SmsDTO, @Res() res): Promise<any> {
    if (!body) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    try {
      const smsData = await this.clicksendService.sendSMS(body);
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

  @Post('sendEmail')
  async sendEmailNotification(
    @Body() body: { content: EmailData },
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

  @Post('sendOtp')
  async sendOtp(@Body() body: OtpDTO, @Res() res): Promise<any> {
    try {
      const generatedOtp = await this.otpService.create(body);
      if (generatedOtp) {
        if (body.channel === 'email') {
          const sendEmailData: EmailData = {
            email: body.userId,
            subject: 'OTP',
            text: `Your OTP is ${generatedOtp}`,
            html: '',
          };
          const response =
            await this.mailersendService.sendEmail(sendEmailData);
          if (response) {
            return res.status(HttpStatus.CREATED).json({
              statusCode: HttpStatus.CREATED,
              message: `OTP sent successfully to ${body.userId} - ${generatedOtp}`,
            });
          }
        } else if (body.channel === 'sms') {
          const sendSMSData: SmsDTO = {
            body: `Your OTP is ${generatedOtp}`,
            to: body.userId,
          };
          const response = await this.clicksendService.sendSMS(sendSMSData);
          if (response) {
            return res.status(HttpStatus.CREATED).json({
              statusCode: HttpStatus.CREATED,
              message: `OTP sent successfully to ${body.userId} - ${generatedOtp}`,
            });
          }
        }
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
