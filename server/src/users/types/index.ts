import {ApiProperty} from "@nestjs/swagger";

export class SignupResponse {
    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiYWRtaW4xQG1haWwucnUiLCJ1c2VybmFtZSI6ImFkbWluMSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2ODc3ODY0NTcsImV4cCI6MTY5MDYzNzY1N30.qAfvUyvgfCzEjJc0gXX7rU7Byr2ny8ukuDK3V4HYKA4'})
    access_token: string;

    @ApiProperty({example: 'admin1@mail.ru'})
    email: string;

    @ApiProperty({example: 'admin1'})
    username: string;

    @ApiProperty({example: 'client'})
    role: string;
}

class Category {
    @ApiProperty({example: '1'})
    id: number;

    @ApiProperty({example: 'Programming'})
    name: string;
}

class Blog {
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

export class GetUserResponse {
    @ApiProperty({example: '19'})
    id: string;

    @ApiProperty({example: 'admin'})
    username: string;

    @ApiProperty({type: Blog, isArray: true})
    blogs: Blog[];
}