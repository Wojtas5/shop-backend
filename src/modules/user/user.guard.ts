import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from '../core/token.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access-token'];
    if (!token) return false;
    try {
      const payload = this.tokenService.verifyToken(token);
      request.userId = payload.sub;
      return true;
    } catch (e) {
      return false;
    }
  }
}
