import { Module } from '@nestjs/common';

import { ProjectHistoryModule } from '@modules/project-history/project-history.module';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [ProjectHistoryModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
