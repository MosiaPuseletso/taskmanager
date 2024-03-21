import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { User } from "src/users/user.entity";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async create(task: Task, token: string): Promise<Task> {
        const decoded = await this.jwtService.verify(token);
        const user = await this.validateUser(decoded.email);
        if (user) {
            task.user = user;
            return await this.taskRepository.save(task);
        } else {
            return new Task();
        }
    }

    async validateUser(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { email } }); // Include 'tasks' in relations
        if (!user) {
            return undefined;
        }
        return user;
    }

    async fetchTasks(token: string): Promise<Task[] | undefined> {
        const decoded = await this.jwtService.verify(token);
        const id = decoded.sub
        const user = await this.userRepository.findOne({ where: { id }, relations: ['tasks'] });

        if (!user) {
            return undefined;
        }

        return user.tasks;
    }

    async updateTask(task: Task, token: string): Promise<Task> {
        const decoded = await this.jwtService.verify(token);
        const user = await this.validateUser(decoded.email);
        if (user) {
            const id = task.id
            const existingTask = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });

            if (!existingTask) {
                return new Task();
            }

            if (existingTask.user.id !== user.id) {
                return new Task();
            }

            const updatedTsak = { ...existingTask, ...task };
            return await this.taskRepository.save(updatedTsak);
        } else {
            return new Task();
        }
    }

    async deleteTask(id: string, token: string): Promise<string | undefined> {
        const decoded = await this.jwtService.verify(token);
        const user = await this.validateUser(decoded.email);
        if (user) {
            const existingTask = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });

            if (!existingTask) {
                return undefined;
            }

            if (existingTask.user.id !== user.id) {
                return undefined;
            }
            await this.taskRepository.remove(existingTask);
            return id;
        } else {
            return undefined;
        }
    }

}