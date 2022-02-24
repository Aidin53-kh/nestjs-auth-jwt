import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async register(username: string, email: string, pass: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(pass, 10);

        const user = new this.userModel({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        return { username, email, _id: user._id };
    }

    async login(email: string, pass: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new NotFoundException('email not found');

        const isMatchPass = await bcrypt.compare(pass, user.password);
        if (!isMatchPass) throw new BadRequestException('incorect email or password');

        return this.jwtService.sign({ id: user._id });
    }
}
