import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    Request,
    UseInterceptors,
    NestInterceptor, Get, Param, Patch
} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {Blog} from "./blog.model";
import {UpdateBlogDto} from "./dto/UpdateBlogDto";

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    async createBlog(@Request() req,
                     @Body() blog: CreateBlogDto,
                     @UploadedFile() image: Express.Multer.File): Promise<Blog> {
        return this.blogService.create(blog, req.user.id, image);
    }

    @Get('all')
    async getBlogs() {
        return this.blogService.getAll();
    }

    @Get('find/:id')
    async getBlog(@Param('id') id: number) {
        return this.blogService.getOne(id);
    }


    @Patch('update:id')
    updateBlog(
        @Param('id') blogId: number,
        @Body() blog: UpdateBlogDto,
        @UploadedFile() image: Express.Multer.File
    ) {
        return this.blogService.update(blog, blogId, image);
    }
}
