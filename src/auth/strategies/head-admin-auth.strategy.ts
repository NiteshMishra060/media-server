import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from  "passport-jwt";
import { Request } from "express";
@Injectable()
export class HeadAdminAuthStrategy extends PassportStrategy(
  Strategy,
  "head-admin-auth"
) {
  constructor() {
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromExtractors([    // For Cookies 
      //   (request: Request) => {
      //     let data = request?.cookies["access_token"];
      //     if (!data) {
      //       return null;
      //     }
      //     return data;
      //   },
      // ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload.sub === null || payload.sub === undefined || !payload.sub) {
      throw new UnauthorizedException();
    }
    if (payload.role !== "infra")
      throw new UnauthorizedException(
        `Your given role doesn't allow you to access this resource`
      );
    console.log(payload, ` payload`);
    return { userId: payload.sub, username: payload.username };
  }
}
