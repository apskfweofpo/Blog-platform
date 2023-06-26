import {ApiProperty} from "@nestjs/swagger";

export class LoginUserRequest {
    @ApiProperty({example: 'Ivan'})
    email: string;

    @ApiProperty({example: '12345'})
    password: string;
}

export class LoginUserResponse {
    @ApiProperty({example: 'admin1@mail.ru'})
    email: string;

    @ApiProperty({example: 'admin1'})
    username: string;

    @ApiProperty({example: 'client'})
    role: string;

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiYWRtaW4xQG1haWwucnUiLCJ1c2VybmFtZSI6ImFkbWluMSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2ODc4MTM3MDgsImV4cCI6MTY5MDY2NDkwOH0.J8qPsYGYIaOx1FcnfVege--fexVfBDSi17_sBo3bHxQ'})
    access_token: string;



}