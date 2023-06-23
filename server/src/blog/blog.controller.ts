import {Body, Controller, Post, UploadedFile, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {BlogService} from "./blog.service";
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    createPost(@Request() req,
               @Body() blog: CreateBlogDto,
               @UploadedFile() image,) {
        this.blogService.create(blog, req.user.id, image);

        //console.log(req.user.id)
    }

}
