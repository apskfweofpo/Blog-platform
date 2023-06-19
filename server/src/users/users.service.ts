import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.model";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createUser(createUserDto): Promise<User | { warningMessage: string }> {

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
        return this.userRepository.save(user);
    }
}
