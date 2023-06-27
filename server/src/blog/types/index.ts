import {ApiProperty} from "@nestjs/swagger";

class Category {
    @ApiProperty({example: '1'})
    id: number;

    @ApiProperty({example: 'Programming'})
    name: string;
}

class Author {
    @ApiProperty({example: 'admin'})
    username: string;
}

export class CreateBlogResponse {
    @ApiProperty({example: '19'})
    id: number;

    @ApiProperty({example: 'Programming'})
    title: string;

    @ApiProperty({example: 'a1c528c1-741d-4a2e-8ac8-7305297848d5.jpg'})
    image: string;

    @ApiProperty({example: 'There are many types of programming'})
    content: string;

    @ApiProperty({type: Category, isArray: true})
    categories: Category[];
}


export class GetBlogResponse {
    @ApiProperty({example: '19'})
    id: number;

    @ApiProperty({example: 'Programming'})
    title: string;

    @ApiProperty({example: 'a1c528c1-741d-4a2e-8ac8-7305297848d5.jpg'})
    image: string;

    @ApiProperty({example: 'There are many types of programming'})
    content: string;

    @ApiProperty({type: Author})
    author: Author

    @ApiProperty({type: Category, isArray: true})
    categories: Category[];
}


export class RemoveBlogResponse {
    @ApiProperty({example: '1'})
    raw: Array<string>;

    @ApiProperty({example: '1'})
    affected: number;
}

export class UpdateBlogResponse {
    @ApiProperty({example: '19'})
    id: number;

    @ApiProperty({example: 'Programming'})
    title: string;

    @ApiProperty({example: 'a1c528c1-741d-4a2e-8ac8-7305297848d5.jpg'})
    image: string;

    @ApiProperty({example: 'There are many types of programming'})
    content: string;
}