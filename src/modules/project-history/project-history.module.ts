import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './project-history.model';
import { ProjectHistoryService } from './project-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectHistoryService],
  exports: [ProjectHistoryService],
})
export class ProjectHistoryModule {}
