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

  async sendVerificationEmail(input: VerificationInput): Promise<boolean> {
    const { data, status } = await axios.post(
      EMAIL_URL,
      {
        ...this.configService.get('email'),
        template_params: {
          to_name: input.fullName,
          to: input.email,
          code: input.code,
        },
      },
      {
        timeout: 5000,
      }
    );
    Logger.warn('Email Payload', { data });
    return [200, 201].includes(status);
  }
}
