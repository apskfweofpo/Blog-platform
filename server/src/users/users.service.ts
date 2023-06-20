import {BadRequestException, Injectable} from '@nestjs/common';
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
    ) {}

    async createUser(createUserDto): Promise<{'access_token':string} | { warningMessage: string }> {

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

        const token = this.jwtService.sign({id: user.id, email: user.email, username: user.username});
        return  {'access_token': token};
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {email}
        });
    }
}
