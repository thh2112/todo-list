import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { PROJECT_STATUS } from '@shared/constants';
import { Audit } from '@shared/models/audit.model';

@Entity('projects')
export class Project extends Audit {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @Column({ name: 'user_id' })
  public userId: string;

  @Index()
  @Column()
  public name: string;

  @Index()
  @Column({ default: PROJECT_STATUS.ACTIVE })
  public status: PROJECT_STATUS;

  @Column({ type: 'jsonb', nullable: true })
  public metadata: Record<string, any>;
}
