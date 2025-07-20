import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TASK_STATUS } from '@shared/constants';
import { Audit } from '@shared/models/audit.model';

@Entity('tasks')
export class Task extends Audit {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ name: 'user_id' })
  public userId: string;

  @Column({ name: 'project_id' })
  public projectId: string;

  @Column({ default: TASK_STATUS.TO_DO })
  public status: TASK_STATUS;

  @Column({ type: 'jsonb', nullable: true })
  public metadata: Record<string, any>;
}
