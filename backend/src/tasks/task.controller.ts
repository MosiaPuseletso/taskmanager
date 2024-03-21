import { Controller, Get, Post, Put, Delete, Headers, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks') // Defines the base route for user endpoints
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Post('create') // Register endpoint (POST request to /users)
    @UsePipes(new ValidationPipe()) // Enables validation using ValidationPipe
    async create(@Body() payload: {}): Promise<{}> {
        try {
            const task = new Task();
            task.title = payload['title'];
            task.description = payload['description'];
            task.dueDate = payload['dueDate'];
            task.priority = payload['priority'];
            task.status = payload['status'];
            const newTask = await this.taskService.create(task, payload['token']);
            return newTask; // Return basic user info
        } catch (error) {
            // Handle potential errors during user creation (e.g., email conflicts)
            return { message: "ERROR CREATING TASK" };
        }
    }

    @Get('fetch') // Register endpoint (POST request to /users)
    @UsePipes(new ValidationPipe()) // Enables validation using ValidationPipe
    async fetchTasks(@Headers('token') token: string): Promise<{}> {
        try {
            const tasks = await this.taskService.fetchTasks(token);
            return tasks; // Return basic user info
        } catch (error) {
            // Handle potential errors during user creation (e.g., email conflicts)
            return { message: "ERROR GETTING TASKS" };
        }
    }

    @Put('update') // Register endpoint (POST request to /users)
    @UsePipes(new ValidationPipe()) // Enables validation using ValidationPipe
    async updateTask(@Body() payload: {}, @Headers('token') token: string): Promise<{}> {
        try {
            const task = new Task();
            task.title = payload['title'];
            task.description = payload['description'];
            task.dueDate = payload['dueDate'];
            task.priority = payload['priority'];
            task.status = payload['status'];
            task.id = payload['id']
            const tasks = await this.taskService.updateTask(task, token);
            return tasks; // Return basic user info
        } catch (error) {
            // Handle potential errors during user creation (e.g., email conflicts)
            return { message: "ERROR UPDATING TASK" };
        }
    }

    @Delete('delete/:id') // Register endpoint (POST request to /users)
    @UsePipes(new ValidationPipe()) // Enables validation using ValidationPipe
    async deleteTask(@Headers('token') token: string, @Param('id') id: string): Promise<{}> {
        try {
            const task = await this.taskService.deleteTask(id, token);
            return { id: task }; // Return basic user info
        } catch (error) {
            // Handle potential errors during user creation (e.g., email conflicts)
            return { message: "ERROR DELETING TASK" };
        }
    }
}