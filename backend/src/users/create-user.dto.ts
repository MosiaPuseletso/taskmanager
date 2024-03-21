export class CreateUserDto {
    readonly email: string;
    readonly password: string;
}

export class UserResponseDto {
    id: string;
    email: string;
}