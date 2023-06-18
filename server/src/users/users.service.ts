import { Injectable } from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.model";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
    ) {}

    async createUser(createUserDto) {
        const user = User.create();
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        return User.save(user);

    }
}
