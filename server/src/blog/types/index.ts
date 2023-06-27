import {ApiProperty} from "@nestjs/swagger";

export class CreateBlogResponse {
    @ApiProperty({example: "Programming"})
    name: string

    @ApiProperty({example: "1"})
    id: number
}