import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Blog} from "./blog.model";
import {FilesService} from "../files/files.service";
import {User} from "../users/users.model";

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,

        @InjectRepository(Blog)
        private readonly userRepository: Repository<User>,

        private readonly fileService: FilesService
    ) {
    }
    async create(blog: CreateBlogDto, id: number, image: Express.Multer.File): Promise<Blog> {
        const fileName = await this.fileService.createFile(image);

        const author = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if(!author){
            throw new UnauthorizedException('Invalid token');
        }

        const newBlog = this.blogRepository.create();
        newBlog.title = blog.title;
        newBlog.content = blog.content;
        newBlog.image = fileName;
        newBlog.author = author;

        return await this.blogRepository.save(newBlog);
    }
}
