import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmEntityRepository } from '@app/db';
import { OtvcEntity } from './otvc.entity';

@Injectable()
@TypeOrmEntityRepository(OtvcEntity)
export class OtvcRepository extends Repository<OtvcEntity> {}
