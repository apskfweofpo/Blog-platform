import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    Request,
    UseInterceptors,
    Get, Param, Patch, Delete, Query
} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {Blog} from "./blog.model";
import {UpdateBlogDto} from "./dto/UpdateBlogDto";
import {AuthorGuard} from "../guards/author.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {CreateBlogResponse, GetBlogResponse, RemoveBlogResponse, UpdateBlogResponse} from "./types";

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {
    }

    @ApiOkResponse({type: CreateBlogResponse})
    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    async createBlog(@Request() req,
                     @Body() blog: CreateBlogDto,
                     @UploadedFile() image: Express.Multer.File): Promise<Blog> {
        return this.blogService.create(blog, req.user.id, image);
    }

    @ApiOkResponse({type: [GetBlogResponse]})
    @Get('')
    async getBlogs(
        @Query('limit') limit = 5,
        @Query('page') page = 1,
    ) {
        return this.blogService.getAll(limit, page);
    }

    @ApiOkResponse({type: GetBlogResponse})
    @Get('/:id')
    async getBlog(@Param('id') id: number) {
        return this.blogService.getOne(id);
    }

    @ApiOkResponse({type: GetBlogResponse})
    @Get('/search/:blog')
    search(@Param('blog') blog: string) {
        return this.blogService.findByString(blog)
    }

    @ApiOkResponse({type: UpdateBlogResponse})
    @Patch('/:id')
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard, AuthorGuard)
    updateBlog(
        @Param('id') blogId: number,
        @Body() blog: UpdateBlogDto,
        @UploadedFile() image: Express.Multer.File
    ) {
        return this.blogService.update(blog, blogId, image);
    }

    @ApiOkResponse({type: RemoveBlogResponse})
    @Delete('/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    removeBlog(
        @Param('id') blogId: number,
    ) {
        return this.blogService.remove(blogId);
    }
}
