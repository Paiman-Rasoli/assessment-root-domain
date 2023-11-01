import { Injectable, Logger } from '@nestjs/common';
import { AppConfigService } from '../../config/app-config.service';
import axios from 'axios';

const EMAIL_URL = 'https://api.emailjs.com/api/v1.0/email/send';

interface VerificationInput {
  code: number;
  fullName: string;
  email: string;
}

@Injectable()
export class EmailHelper {
  constructor(private readonly configService: AppConfigService) {}

  async sendVerificationEmail(input: VerificationInput): Promise<void> {
    Logger.warn('Email config', this.configService.get('email'));
    axios
      .post(EMAIL_URL, {
        ...this.configService.get('email'),
        template_params: {
          to_name: input.fullName,
          to: input.email,
          code: input.code,
        },
      })
      .then(() => {
        Logger.log('Email sent successfully');
      })
      .catch((err) => {
        console.log(err);
        Logger.error('Error while sending email.', { err });
      });
  }
}
