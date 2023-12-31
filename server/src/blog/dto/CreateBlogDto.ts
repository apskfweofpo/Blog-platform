import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateBlogDto {
    @ApiProperty({example: 'Animals'})
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({example: 'There are millions animals.'})
    @IsNotEmpty()
    readonly content: string

    @ApiProperty({example: '[8, 9]'})
    readonly categories: string
}