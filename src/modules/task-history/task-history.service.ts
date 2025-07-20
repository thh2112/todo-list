import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseCRUDService } from '@shared/services/base-crud.service';

import { Task } from './task-history.model';

@Injectable()
export class TaskHistoryService extends BaseCRUDService<Task> {
  constructor(
    @InjectRepository(Task)
    protected repo: Repository<Task>,
  ) {
    super(repo);
  }
}
