import {
    Body,
    Controller, Get,
    Header,
    HttpCode,
    HttpStatus,
    Injectable, Param,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/createUserDto";

@Injectable()
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService) {
    }

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get('/:id')
    getUser(@Param('id') id: number){
        return this.userService.getOne(id);
    }
}