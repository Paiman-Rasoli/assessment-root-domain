import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SignupMode, Status, UsersDomain } from '../users.domain';

export type WritableUser = Omit<UsersDomain, 'id' | 'createdAt'>;
export type UpdatableUser = Partial<WritableUser>;

@Entity({ name: 'users' })
export class UsersEntity implements UsersDomain {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 225 })
  firstName: string;

  @Column({ type: 'varchar', length: 225 })
  lastName: string;

  @Column({ type: 'varchar', length: 225 })
  email: string;

  @Column({ type: 'varchar', length: 225 })
  password: string;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column({ name: 'signup_mode', type: 'enum', enum: SignupMode })
  signupMode: SignupMode;

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  @CreateDateColumn()
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
