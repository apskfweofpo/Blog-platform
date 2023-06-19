import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

enum UserRole {
    ADMIN = "admin",
    CLIENT = "client",
}

@Entity('user')
export class User  {
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