import { Column, Entity } from 'typeorm';
import { Scope, OneTimeVerificationCodeDomain } from '../otvc.domain';

@Entity({ name: 'otvc' })
export class OtvcEntity implements OneTimeVerificationCodeDomain {
  @Column({ type: 'varchar', length: 225, primary: true })
  userId: number;

  @Column({ type: 'integer' })
  code: number;

  @Column({ type: 'enum', enum: Scope })
  scope: Scope;

  @Column({ type: 'timestamp with time zone' })
  createdAt: Date;
}
