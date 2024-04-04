import { Module } from '@nestjs/common';
import { ClicksendService } from './sms/clicksend/clicksend.service';
import { HttpModule } from '@nestjs/axios';
import { MailersendService } from './email/mailersend/mailersend.service';
import { OtpService } from './otp/otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from '../infrastructure/mongodb/schemas/otp.schema';
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
  ],
  exports: [ClicksendService, MailersendService, OtpService],
  providers: [ClicksendService, MailersendService, OtpService],
})
export class NotificationModule {}
