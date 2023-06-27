import {IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateBlogDto {
    @ApiProperty({example: 'Animals'})
    @IsOptional()
    readonly title: string

    @ApiProperty({example: 'There are millions animals.'})
    @IsOptional()
    readonly content: string
}