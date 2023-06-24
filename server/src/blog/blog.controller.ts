import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    Request,
    UseInterceptors,
    NestInterceptor
} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {Blog} from "./blog.model";

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    async createPost(@Request() req,
               @Body() blog: CreateBlogDto,
               @UploadedFile() image: Express.Multer.File,): Promise<Blog> {
        return this.blogService.create(blog, req.user.id, image);
    }

}
