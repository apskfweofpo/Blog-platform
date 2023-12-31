import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Like, Repository} from "typeorm";
import {Blog} from "./blog.model";
import {FilesService} from "../files/files.service";
import {User} from "../users/users.model";
import {UpdateBlogDto} from "./dto/UpdateBlogDto";
import {Category} from "../categories/category.model";

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        private readonly fileService: FilesService
    ) {
    }

    async create(blog: CreateBlogDto, id: number, image: Express.Multer.File): Promise<Blog> {

        const author = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!author) {
            throw new UnauthorizedException('Invalid token');
        }

        const fileName = await this.fileService.createFile(image);
        const newBlog = this.blogRepository.create();
        newBlog.title = blog.title;
        newBlog.content = blog.content;
        newBlog.image = fileName;
        newBlog.author = author;

        let categories: Array<Category> = [];


        for( let idCategory of JSON.parse(blog.categories)) {
           const category = await this.categoryRepository.findOne({
                where: {id:idCategory}
            })
            categories.push(category);
        }
        newBlog.categories = categories;

        return await this.blogRepository.save(newBlog);
    }

    async getAll(limit: number, page: number): Promise<Blog[]> {
        return this.blogRepository.find({
            relations: {
                author: true,
                categories: true
            },
            select: {
                author: {
                    username: true
                }
            },
            take: limit,
            skip: (page - 1) * limit
        });
    }

    async getOne(id: number): Promise<Blog> {
        return this.blogRepository.findOne({
            where: {
                id
            },
            relations: {
                author: true,
                categories: true
            },
            select: {
                author: {
                    username: true
                }
            }
        });
    }

    async update(newBlog: UpdateBlogDto, blogId: number, image: Express.Multer.File): Promise<Blog> {

        const oldBlog = await this.blogRepository.findOneBy({
            id: blogId
        });

        if (newBlog.title) {
            oldBlog.title = newBlog.title;
        }

        if (newBlog.content) {
            oldBlog.content = newBlog.content;
        }
        const fileName = await this.fileService.createFile(image);
        oldBlog.image = fileName;

        return await this.blogRepository.save(oldBlog);
    }

    async remove(blogId: number): Promise<DeleteResult> {
        return this.blogRepository.delete(blogId);
    }

    async findByString(blog: string): Promise<Blog[]> {
        return await this.blogRepository.find({
            where: {
                title: Like(`%${blog}%`)
            },
            relations: {
                categories: true,
                author: true
            },
            select: {
                author: {
                    username: true
                }
            }
        })
    }
}
