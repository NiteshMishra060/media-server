import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HeadAdminGuard extends AuthGuard('head-admin-auth') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      console.log('error', info);
      throw new UnauthorizedException('Invalid Token!');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
