import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async create(CreateUserDto: CreateUserDto): Promise<User> {
        const newUser = new User();
        newUser.email = CreateUserDto.email;
        newUser.password = CreateUserDto.password;
        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async login(email: string, password: string): Promise<{ accessToken: string } | undefined> {
        const user = await this.findOneByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return undefined;
        }

        const payload = { email: user.email, sub: user.id };
        const token = { accessToken: this.jwtService.sign(payload) };

        return token;
    }
}