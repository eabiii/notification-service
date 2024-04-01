import { Module } from '@nestjs/common';
import { ClicksendService } from './sms/clicksend/clicksend.service';
import { HttpModule } from '@nestjs/axios';
import { MailersendService } from './email/mailersend/mailersend.service';
@Module({
  imports: [HttpModule],
  exports: [ClicksendService, MailersendService],
  providers: [ClicksendService, MailersendService],
})
export class NotificationModule {}
