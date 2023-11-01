import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { TypeOrmEntityRepository } from '@app/db';
import { Status } from '../users.domain';

@Injectable()
@TypeOrmEntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  async getAveragePastSevenDays(): Promise<number> {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const result = await this.createQueryBuilder()
      .where('updated_at BETWEEN :sevenDaysAgo AND :today', {
        sevenDaysAgo,
        today,
      })
      .getCount();

    return Math.round(result / 7);
  }

  async getTotalActiveToday(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = await this.createQueryBuilder()
      .where('updated_at BETWEEN :today AND :tomorrow AND is_active = true', {
        today,
        tomorrow,
      })
      .getCount();

    return result;
  }

  async getTotalActiveSignup(): Promise<number> {
    return this.count({
      where: {
        status: Status.ACTIVE,
      },
    });
  }
}
