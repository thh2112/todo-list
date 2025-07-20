import { MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @MinLength(3)
  projectId: string;
}
