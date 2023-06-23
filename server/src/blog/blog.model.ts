import {Entity, Column, PrimaryGeneratedColumn, ManyToOne,} from 'typeorm';
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

    @ManyToOne(() => User, (user) => user.blogs)
    author: User

}