import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersDomain } from '../users.domain';

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

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  @CreateDateColumn()
  createdAt: string;

  @Column({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: string;
}
