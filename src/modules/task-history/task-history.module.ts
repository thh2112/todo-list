import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './task-history.model';
import { TaskHistoryService } from './task-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskHistoryService],
  exports: [TaskHistoryService],
})
export class TaskHistoryModule {}
