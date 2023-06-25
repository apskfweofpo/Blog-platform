import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable,} from 'typeorm';
import {User} from "../users/users.model";
import {Category} from "../categories/category.model";

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

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]

}