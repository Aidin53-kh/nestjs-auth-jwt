import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async register(@Body() user: RegisterUserDto) {
        return await this.userService.register(user.username, user.email, user.password);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() user: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.userService.login(user.email, user.password);
        res.cookie('Authorization', `Bearer ${token}`);
        res.redirect('/');
    }

    @HttpCode(200)
    @Get('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('Authorization');
        res.redirect('/');
        return null;
    }
}
