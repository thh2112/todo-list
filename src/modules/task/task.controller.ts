import { HttpResponse } from 'mvc-common-toolkit';

import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { ProjectHistoryService } from '@modules/project-history/project-history.service';
import { TaskHistoryService } from '@modules/task-history/task-history.service';
import { User } from '@modules/user/user.model';

import { ERR_CODE, PROJECT_STATUS } from '@shared/constants';
import { RequestUser } from '@shared/decorators/request-user';
import {
  generateConflictResult,
  generateNotFoundResult,
} from '@shared/helpers/operation-result';

import { CreateTaskDTO } from './task.dto';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(
    protected projectHistoryService: ProjectHistoryService,
    protected taskHistoryService: TaskHistoryService,
  ) {}

  @Post()
  public async createTask(
    @RequestUser() user: User,
    @Body() dto: CreateTaskDTO,
  ): Promise<HttpResponse> {
    const foundProject = await this.projectHistoryService.findOne({
      id: dto.projectId,
      userId: user.id,
      status: PROJECT_STATUS.ACTIVE,
    });

    if (!foundProject) {
      return generateNotFoundResult('Project not found', ERR_CODE.NOT_FOUND);
    }

    const foundTask = await this.taskHistoryService.findOne({
      name: dto.name,
      projectId: dto.projectId,
      userId: user.id,
    });

    if (foundTask) {
      return generateConflictResult(
        'Task already exists',
        ERR_CODE.ALREADY_TASK_EXISTS,
      );
    }

    const createdTask = await this.taskHistoryService.create({
      name: dto.name,
      projectId: dto.projectId,
      userId: user.id,
    });

    return {
      success: true,
      data: createdTask,
    };
  }

  @Delete(':taskId')
  public async deleteTask(
    @RequestUser() user: User,
    @Param('taskId') taskId: string,
  ): Promise<HttpResponse> {
    const foundTask = await this.taskHistoryService.findOne({
      id: taskId,
      userId: user.id,
    });

    if (!foundTask) {
      return generateNotFoundResult('Task not found', ERR_CODE.NOT_FOUND);
    }

    await this.taskHistoryService.deleteByID(taskId);

    return {
      success: true,
    };
  }
}
