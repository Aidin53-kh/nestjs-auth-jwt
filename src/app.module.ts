import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        UserModule,
        MongooseModule.forRoot('mongodb://localhost/nestjs-auth'),
        JwtModule.register({
            secret: 'aidin53',
            signOptions: { expiresIn: 3000 },
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
