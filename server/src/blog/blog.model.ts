import {Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';
import {User} from "../users/users.model";

@Entity('blog')
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    title: string;

    @Column()
    image: string;

    @Column({length: 1000 })
    content: string;

    @Column()
    author: User;

}