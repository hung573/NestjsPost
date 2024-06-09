import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ){}
    async canActivate(context: ExecutionContext,): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // 1) Get token from header
        const token = request.headers.authorization.split(' ')[1];
        if(!token){
            throw new ForbiddenException("Please provide access token");
        }
        try {
            // 2) jwtVerify validate token
            const payload =  await this.jwtService.verifyAsync(token,{
                secret: process.env.JWT_SECRET,
            })
            // 3) find user in db based on jwtVerify
            const user = await this.userService.findByEmail(payload.email)
            if(!user){
                throw new BadRequestException("Email chua ton tai");
            }
            // 4) Assign user to request object
            request.currentUser = user;
        } catch{
            throw new ForbiddenException("Please provide access token");
        }
        return true
    }
}


