import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    // Implement your token validation logic here
    const isValidToken = this.validateToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  validateToken(token: string): boolean {
    //we will  just check if the token is a non-empty string.
    return token && token.trim() !== '';
  }
}