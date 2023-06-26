import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateBlogDto {
    @ApiProperty({example: 'Animals'})
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({example: '66914a6e-62a2-4f0d-99a0-3fc975bb549f.jpg'})
    @IsNotEmpty()
    readonly image: string

    @ApiProperty({example: 'There are millions animals.'})
    @IsNotEmpty()
    readonly content: string

    @ApiProperty({example: '[8, 9]'})
    readonly categories: string
}