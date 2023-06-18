import {Body, Controller, Get, Header, HttpCode, HttpStatus, Injectable, Post} from '@nestjs/common';
import {UsersService} from "./users.service";

@Injectable()
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService) {
    }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createUser(@Body() createUserDto) {
        return this.userService.createUser(createUserDto);
    }
}
