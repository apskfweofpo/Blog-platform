import {Controller, Post, UseGuards, Request, Get, HttpCode, HttpStatus, Header} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "../guards/local-auth.guard";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {Roles} from "../decorators/roles.decorator";
import {RolesGuard} from "../guards/roles.guard";
import {ApiBody, ApiOkResponse} from "@nestjs/swagger";
import {LoginUserRequest, LoginUserResponse} from "./types";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @ApiBody({ type: LoginUserRequest })
    @ApiOkResponse({ type: LoginUserResponse })
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
