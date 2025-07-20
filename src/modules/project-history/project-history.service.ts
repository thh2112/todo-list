import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseCRUDService } from '@shared/services/base-crud.service';

import { Project } from './project-history.model';

@Injectable()
export class ProjectHistoryService extends BaseCRUDService<Project> {
  constructor(
    @InjectRepository(Project)
    repo: Repository<Project>,
  ) {
    super(repo);
  }
}
