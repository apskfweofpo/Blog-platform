import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from 'typeorm';
import {Blog} from "../blog/blog.model";

enum UserRole {
    ADMIN = "admin",
    CLIENT = "client",
}

@Entity('user')
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

    @OneToMany(() => Blog, (blog) => blog.author)
    blogs: Blog[]

}