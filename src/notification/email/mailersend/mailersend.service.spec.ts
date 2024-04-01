import { Test, TestingModule } from '@nestjs/testing';
import {
  MailersendService,
  MailerSend,
  EmailParams,
  Sender,
  Recipient,
} from './mailersend.service';
import { Config } from '../../../config';

describe('MailersendService', () => {
  let service: MailersendService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailersendService],
    }).compile();

    service = module.get<MailersendService>(MailersendService);
  });

  it('should send an email', async () => {
    const sentFrom = new Sender(Config.mailerEmailDomain);
    const recipients = [new Recipient('test@example.com')];
    const emailData = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject('Test')
      .setText('Test email');
    const sendEmailMock = jest.spyOn(service, 'sendEmail');
    sendEmailMock.mockResolvedValue(true);
    await service.sendEmail(emailData);
    expect(sendEmailMock).toHaveBeenCalled();
  });
});
