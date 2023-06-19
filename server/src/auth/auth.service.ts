import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {IUser} from "../types/types";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (user && passwordIsValid) {
            const {password, ...result} = user;
            return result;
        }
        throw new UnauthorizedException('User or password are incorrect')
    }

    async login(user: IUser) {
        const payload = {id: user.id, email: user.email, username: user.username};
        return {
            email: user.email,
            username: user.username,
            access_token: this.jwtService.sign(payload),
        };
    }
}
