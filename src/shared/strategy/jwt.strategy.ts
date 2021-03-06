import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `process.env.JWT_SECRET`,
    });
  }
  // Validate and return data from jwt-strategy
  async validate(payload: any) {
    return {
      email: payload.email,
      userId: payload.userId,
      name: payload.name,
    };
  }
}
