import {BadRequestException, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);
        const passwordIsValid = await bcrypt.compare(user.password, password)
        if (user &&  passwordIsValid) {
            const {password, ...result} = user;
            return result;
        }
        throw new BadRequestException('User or password are incorrect')
    }
}
