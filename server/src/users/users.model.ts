import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum UserRole {
    ADMIN = "admin",
    CLIENT = "client",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CLIENT,
    })
    role: UserRole

}