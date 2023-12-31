import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.model";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
    }

    async createUser(createUserDto): Promise<{ 'access_token': string, email: string, username: string, role: string } | { warningMessage: string }> {

        const existingUserByName = await this.userRepository.findOne({
            where: {username: createUserDto.username}
        })

        const existingUserByEmail = await this.userRepository.findOne({
            where: {email: createUserDto.email}
        })

        if (existingUserByEmail) {
            throw new BadRequestException('Пользователь с таким email существует')
        }

        if (existingUserByName) {
            throw new BadRequestException('Пользователь с таким username существует')
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 3);
        const user = this.userRepository.create();
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = hashedPassword;

        const newUser = await this.userRepository.save(user);

        const token = this.jwtService.sign({id: user.id, email: user.email, username: user.username, role: user.role});
        return {
            access_token: token,
            email: newUser.email,
            username: newUser.username,
            role: user.role
        };
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {email}
        });
    }

    async getOne(id: number): Promise<User | NotFoundException> {
        const user = await this.userRepository.findOne({
                where: {id},
                relations: {
                    blogs: {
                        categories: true
                    }
                },
                select: ["id", "blogs", "username"]
            }
        )
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user
    }
}
