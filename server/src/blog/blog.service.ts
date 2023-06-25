import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {Blog} from "./blog.model";
import {FilesService} from "../files/files.service";
import {User} from "../users/users.model";
import {UpdateBlogDto} from "./dto/UpdateBlogDto";

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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

        return await this.blogRepository.save(newBlog);
    }

    getAll(): Promise<Blog[]> {
        return this.blogRepository.find({
            relations: {
                author: true
            },
            select: {
                author: {
                    username: true
                }
            }
        });
    }

    getOne(id: number): Promise<Blog> {
        return this.blogRepository.findOne({
            where: {
                id
            },
            relations: {
                author: true
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

    async remove(blogId: number) {
        const blog = await this.blogRepository.findOneBy({
            id: blogId
        });

        return this.blogRepository.remove(blog);

    }

    async findByString(blog: string) {
        return await this.blogRepository.find({
            where: {
                title: Like(`%${blog}%`)
            }
        })
    }
}
