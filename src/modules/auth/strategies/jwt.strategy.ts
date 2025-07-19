import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { UserService } from '@modules/user/user.service';

import { ENV_KEY, USER_STATUS } from '@shared/constants';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    protected userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow(ENV_KEY.JWT_SECRET),
    });
  }

  async validate(payload: Partial<Record<string, any>>) {
    const user = await this.userService.findOne({
      email: payload.email,
    });

    if (!user || user.status !== USER_STATUS.ACTIVE) {
      throw new UnauthorizedException('Invalid User');
    }

    return user;
  }
}
