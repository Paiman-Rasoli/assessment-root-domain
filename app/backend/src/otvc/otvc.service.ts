import { Injectable } from '@nestjs/common';
import { OtvcRepository } from './datastore/otvc.repositroy';
import { OneTimeVerificationCodeDomain, Scope } from './otvc.domain';
import { InvalidOtvcCodeException } from './errors';
import { EmailHelper } from './helpers/email.helper';

const CODE_EXPIRATION_TIME = 600000;

@Injectable()
export class OtvcService {
  constructor(
    private readonly otvcRepository: OtvcRepository,
    private readonly emailHelper: EmailHelper
  ) {}

  async create(userId: number, email: string, fullName: string, scope: Scope) {
    const code = this.generateCode();
    const otvc = {
      userId,
      code,
      scope,
      createdAt: new Date(),
    };

    await this.otvcRepository.upsert(otvc, ['userId']);
    await this.emailHelper.sendVerificationEmail({
      code: code,
      email: email,
      fullName: fullName,
    });
    return code;
  }

  /**
   *
   * @throws { InvalidOtvcCodeException }
   *
   *
   */
  async findOne(
    code: number,
    scope: Scope
  ): Promise<OneTimeVerificationCodeDomain> {
    const otvc = await this.otvcRepository.findOneBy({ code });

    if (!otvc) {
      throw new InvalidOtvcCodeException('NOT_FOUND');
    }

    if (otvc.scope !== scope) {
      throw new InvalidOtvcCodeException('SCOPE_MATCH');
    }

    if (
      new Date() > new Date(otvc.createdAt.getTime() + CODE_EXPIRATION_TIME)
    ) {
      throw new InvalidOtvcCodeException('EXPIRED');
    }
    return otvc;
  }

  async removeOne(code: number): Promise<void> {
    this.otvcRepository.delete({ code: code });
  }

  private generateCode(min = 10000, max = 99999): number {
    const randomCode = min + Math.round(Math.random() * (max - min + 1));
    return randomCode;
  }
}
