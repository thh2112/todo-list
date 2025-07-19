import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { ENV_KEY } from '@shared/constants';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(protected configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.configService.getOrThrow(ENV_KEY.JWT_SECRET),
      signOptions: {
        expiresIn: this.configService.getOrThrow(ENV_KEY.JWT_EXPIRATION),
        issuer: this.configService.getOrThrow(ENV_KEY.JWT_ISSUER),
        audience: this.configService.getOrThrow(ENV_KEY.JWT_AUDIENCE),
      },
    };
  }
}
