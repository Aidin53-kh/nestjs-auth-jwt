import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const authCookie = request.cookies.Authorization;
        if (!authCookie) throw new UnauthorizedException();

        const token = authCookie.split(' ')[1];
        const isVerify = this.jwtService.verify(token);

        return isVerify ? true : false;
    }
}
