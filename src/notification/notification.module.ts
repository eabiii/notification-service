import { Module } from '@nestjs/common';
import { ClicksendService } from './sms/clicksend/clicksend.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  exports: [ClicksendService],
  providers: [ClicksendService],
})
export class NotificationModule {}
