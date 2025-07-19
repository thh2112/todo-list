import { OperationResult, bcryptHelper } from 'mvc-common-toolkit';

import { Injectable } from '@nestjs/common';

import { UserService } from '@modules/user/user.service';

import { ERR_CODE, USER_STATUS } from '@shared/constants';
import {
  generateBadRequestResult,
  generateConflictResult,
} from '@shared/helpers/operation-result';

import { LoginDTO, RegisterDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(protected userService: UserService) {}

  public async register(dto: RegisterDTO): Promise<OperationResult> {
    const foundUser = await this.userService.findOne({
      email: dto.email,
    });

    if (foundUser) {
      return generateConflictResult(
        `User with email ${dto.email} already exists`,
      );
    }

    const hashedPassword = await bcryptHelper.hash(dto.password);

    const createdUser = await this.userService.create({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: hashedPassword,
    });

    return {
      success: true,
      data: createdUser,
    };
  }

  public async validateUser(dto: LoginDTO): Promise<OperationResult> {
    const foundUser = await this.userService.findOne({
      email: dto.email.trim(),
    });

    if (!foundUser) {
      return generateBadRequestResult(
        `User with email ${dto.email} not found`,
        ERR_CODE.NOT_FOUND,
      );
    }

    if (foundUser.status !== USER_STATUS.ACTIVE) {
      return generateBadRequestResult(
        `User with email ${dto.email} is not active`,
        ERR_CODE.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcryptHelper.compare(
      dto.password,
      foundUser.password,
    );

    if (!isPasswordValid) {
      return generateBadRequestResult(
        'Invalid password',
        ERR_CODE.UNAUTHORIZED,
      );
    }

    return {
      success: true,
      data: foundUser,
    };
  }
}
