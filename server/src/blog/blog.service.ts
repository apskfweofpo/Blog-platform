import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
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

        if(!author){
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

    getAll() {
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

    getOne(id: number) {
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

    update(blog: UpdateBlogDto, blogId: number, image: Express.Multer.File) {

    }
}
