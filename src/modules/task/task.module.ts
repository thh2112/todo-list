import { Module } from '@nestjs/common';

import { ProjectHistoryModule } from '@modules/project-history/project-history.module';
import { TaskHistoryModule } from '@modules/task-history/task-history.module';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [ProjectHistoryModule, TaskHistoryModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
