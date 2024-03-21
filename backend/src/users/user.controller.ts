import { Controller, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserResponseDto } from './create-user.dto';

@Controller('users') // Defines the base route for user endpoints
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('create') // Register endpoint (POST request to /users)
    @UsePipes(new ValidationPipe()) // Enables validation using ValidationPipe
    async create(@Body() createUserDto: CreateUserDto): Promise<{}> {
        try {
            const newUser = await this.userService.create(createUserDto);
            return { id: newUser.id, email: newUser.email }; // Return basic user info
        } catch (error) {
            // Handle potential errors during user creation (e.g., email conflicts)
            if (error.code === 'ER_DUP_ENTRY') {
                return { message: "EMAIL ALREADY EXISTS" };
            } else {
                return error; // Re-throw other errors for better handling
            }
        }
    }

    @Post('auth') // Authentication endpoint (POST request to /users/auth)
    async authenticate(@Body() credentials: { email: string; password: string }): Promise<{}> {
        try {
            const user = await this.userService.login(credentials.email, credentials.password);
            return user; // Assuming UserResponseDto is suitable for authentication response
        } catch (error) {
            return { message: "INVALID CREDENTIALS" }
        }
    }
}
