import {Body, Controller, Post, UploadedFile, UseGuards, Request, UseInterceptors} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Request() req,
               @Body() blog: CreateBlogDto,
               @UploadedFile() image: Express.Multer.File,) {
       return  this.blogService.create(blog, req.user.id, image);
    }

}
