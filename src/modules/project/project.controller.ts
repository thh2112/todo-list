import { HttpResponse } from 'mvc-common-toolkit';

import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { ProjectHistoryService } from '@modules/project-history/project-history.service';
import { User } from '@modules/user/user.model';

import { ERR_CODE, PROJECT_STATUS } from '@shared/constants';
import { RequestUser } from '@shared/decorators/request-user';
import {
  generateConflictResult,
  generateNotFoundResult,
} from '@shared/helpers/operation-result';

import { CreateProjectDTO, UpdateProjectDTO } from './project.dto';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(protected projectHistoryService: ProjectHistoryService) {}

  @Post()
  public async createProject(
    @RequestUser() user: User,
    @Body() dto: CreateProjectDTO,
  ): Promise<HttpResponse> {
    const foundProject = await this.projectHistoryService.findOne({
      name: dto.name,
      userId: user.id,
      status: PROJECT_STATUS.ACTIVE,
    });

    if (foundProject) {
      return generateConflictResult(
        'Project already exists',
        ERR_CODE.ALREADY_PROJECT_EXISTS,
      );
    }

    const createdProject = await this.projectHistoryService.create({
      name: dto.name,
      userId: user.id,
    });

    return {
      success: true,
      data: createdProject,
    };
  }

  @Patch(':projectId')
  public async updateProject(
    @RequestUser() user: User,
    @Param('projectId') projectId: string,
    @Body() dto: UpdateProjectDTO,
  ): Promise<HttpResponse> {
    const foundProject = await this.projectHistoryService.findOne({
      id: projectId,
      userId: user.id,
      status: PROJECT_STATUS.ACTIVE,
    });

    if (!foundProject) {
      return generateNotFoundResult('Project not found', ERR_CODE.NOT_FOUND);
    }

    const updatedProject = await this.projectHistoryService.updateByID(
      projectId,
      dto,
    );

    return {
      success: true,
      data: updatedProject,
    };
  }

  @Delete(':projectId')
  public async deleteProject(
    @RequestUser() user: User,
    @Param('projectId') projectId: string,
  ): Promise<HttpResponse> {
    const foundProject = await this.projectHistoryService.findOne({
      id: projectId,
      userId: user.id,
      status: PROJECT_STATUS.ACTIVE,
    });

    if (!foundProject) {
      return generateNotFoundResult('Project not found', ERR_CODE.NOT_FOUND);
    }

    await this.projectHistoryService.deleteByID(projectId);

    return {
      success: true,
    };
  }
}
