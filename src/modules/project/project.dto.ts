import { MaxLength, MinLength } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProjectDTO {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {}
