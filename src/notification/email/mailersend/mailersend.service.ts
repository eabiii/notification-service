import { Injectable } from '@nestjs/common';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { Config } from '../../../config';

export interface EmailData {
  from: {
    email: string;
  };
  to: {
    email: string;
  }[];
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class MailersendService {
  private mailerSend: MailerSend;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: Config.mailerApiKey,
    });
  }
  async sendEmail(data: EmailData): Promise<boolean> {
    const sentFrom = new Sender(Config.mailerEmailDomain);
    const recipients = data.to.map((arr) => new Recipient(arr.email));
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(data.subject)
      .setText(data.text);

    const response = await this.mailerSend.email.send(emailParams);
    if (response.statusCode === 202) {
      return true;
    } else {
      return false;
    }
  }
}
export { EmailParams, Sender, Recipient, MailerSend };
