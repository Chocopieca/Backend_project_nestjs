import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailgun from 'mailgun-js';
import { MailI } from '../modules/mail.interface';

@Injectable()
export class MailService {
  private mg: Mailgun.Mailgun;

  constructor(private readonly configService: ConfigService) {
    this.mg = Mailgun({
      apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
      domain: this.configService.get<string>('MAILGUN_API_DOMAIN')
    });
  }

  send(data: MailI): Promise<Mailgun.messages.SendResponse> {
    return new Promise((res, rej) => {
      this.mg.messages().send(data, function(error, body) {
        if(error) {
          rej(error);
        }
        res(body)
      });
    });
  }
}
