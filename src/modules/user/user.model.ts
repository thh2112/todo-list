import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { USER_STATUS } from '@shared/constants';
import { Audit } from '@shared/models/audit.model';

@Entity('users')
export class User extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ default: USER_STATUS.ACTIVE })
  public status: USER_STATUS;

  @Column({ type: 'jsonb', nullable: true })
  public metadata: Record<string, any>;
}
