import {ApiProperty} from "@nestjs/swagger";

export class LoginUserRequest {
    @ApiProperty({example: 'admin@mail.ru'})
    email: string;

    @ApiProperty({example: '12345'})
    password: string;
}

export class LoginUserResponse {
    @ApiProperty({example: 'admin@mail.ru'})
    email: string;

    @ApiProperty({example: 'admin'})
    username: string;

    @ApiProperty({example: 'client'})
    role: string;

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiYWRtaW4xQG1haWwucnUiLCJ1c2VybmFtZSI6ImFkbWluMSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2ODc4MTM3MDgsImV4cCI6MTY5MDY2NDkwOH0.J8qPsYGYIaOx1FcnfVege--fexVfBDSi17_sBo3bHxQ'})
    access_token: string;
}