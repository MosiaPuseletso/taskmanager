import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/task.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Task],
    synchronize: true,
    ssl: Boolean(process.env.DATABASE_SSL)
  }), UsersModule, TasksModule]
})
export class AppModule { }
