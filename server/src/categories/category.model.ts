import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20})
    name: string;
}