import { HttpResponse } from 'mvc-common-toolkit';

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from '@modules/user/user.model';
import { UserService } from '@modules/user/user.service';

import { ENV_KEY } from '@shared/constants';
import { RequestUser } from '@shared/decorators/request-user';
import { extractUserPublicInfo } from '@shared/helpers/user.helper';

import { RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    protected authService: AuthService,
    protected userService: UserService,
    protected jwtService: JwtService,
    protected configService: ConfigService,
  ) {}

  @Post('register')
  public async register(@Body() dto: RegisterDTO): Promise<HttpResponse> {
    const registerResult = await this.authService.register(dto);

    if (!registerResult.success) {
      return registerResult;
    }

    return {
      success: true,
      data: extractUserPublicInfo(registerResult.data),
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req): Promise<HttpResponse> {
    const user = req.user;
    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      success: true,
      data: {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.getOrThrow(
            ENV_KEY.JWT_REFRESH_EXPIRATION,
          ),
        }),
        user: extractUserPublicInfo(user),
      },
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  public async profile(@RequestUser() user: User): Promise<HttpResponse> {
    return {
      success: true,
      data: extractUserPublicInfo(user),
    };
  }
}
