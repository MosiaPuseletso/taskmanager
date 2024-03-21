import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';
import { Task } from "./task.entity";
import { TasksController } from "./task.controller";
import { TasksService } from "./task.service";
import { User } from "src/users/user.entity";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [TypeOrmModule.forFeature([Task, User]),
    JwtModule.register({
        secret: process.env.JWT_SECRET
    })],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService]
})
export class TasksModule { }