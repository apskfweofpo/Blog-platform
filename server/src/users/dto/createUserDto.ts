import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Ivan'})
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(15)
    readonly username: string

    @ApiProperty({example: 'Ivan@gmail.ru'})
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @MinLength(3)
    @MaxLength(15)
    @ApiProperty({example: '12345'})
    @IsNotEmpty()
    readonly password: string

}