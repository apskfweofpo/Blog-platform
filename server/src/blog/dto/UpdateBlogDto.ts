import {IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateBlogDto {
    @ApiProperty({example: 'Animals'})
    @IsOptional()
    readonly title: string

    @ApiProperty({example: '66914a6e-62a2-4f0d-99a0-3fc975bb549f.jpg'})
    @IsOptional()
    readonly image: string

    @ApiProperty({example: 'There are millions animals.'})
    @IsOptional()
    readonly content: string
}