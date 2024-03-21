import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./user.controller";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secret: process.env.JWT_SECRET
    })],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule { }