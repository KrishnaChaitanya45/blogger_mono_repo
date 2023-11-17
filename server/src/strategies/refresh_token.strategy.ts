import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common/decorators';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('authorization').split(' ')[1];
    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}
