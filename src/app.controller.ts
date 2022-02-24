import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from './user/auth.guard';

@Controller()
export class AppController {
    @Get('protected')
    @UseGuards(AuthGuard)
    create() {
        return 'protected route';
    }

    @Get('public')
    user() {
        return 'public route';
    }

    @Get()
    index(@Res() res: Response, @Req() req: Request) {
        res.send(`
            <a href="/protected">protected route</a><br/>
            <a href="/public">public route</a>
            <br/><br/>
            <h1>Login</h1>
            <form action="http://localhost:3000/login" method="post">
                email<input type="email" name="email" id="" placeholder="email">
                password<input type="password" name="password" id="" placeholder="password">
                <button type="submit">login</button>
            </form>
            <br/><br/>
            <h1>Register</h1>
            <form action="http://localhost:3000/register" method="post">
                username<input type="test" name="username" id="" placeholder="username">
                email<input type="email" name="email" id="" placeholder="email">
                password<input type="password" name="password" id="" placeholder="password">
                <button type="submit">register</button>
            </form>
            <br/><br/>
            ${req.cookies['Authorization'] ? '<a href="/logout">logout</a>' : ''}
    `);
    }
}
