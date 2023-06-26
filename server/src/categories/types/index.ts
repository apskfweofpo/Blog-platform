import {ApiProperty} from "@nestjs/swagger";

export class Category {
    @ApiProperty({example: "Programming"})
    name: string

    @ApiProperty({example: "1"})
    id: number
}

export class CreateCategoryResponse {
    @ApiProperty({example: "Programming"})
    name: string

    @ApiProperty({example: "1"})
    id: number
}

export class RemoveCategoryResponse {
    @ApiProperty({example: "Programming"})
    name: string
}
