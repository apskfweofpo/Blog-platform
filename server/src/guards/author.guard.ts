import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Repository} from "typeorm";
import {Blog} from "../blog/blog.model";

export class AuthorGuard implements CanActivate {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const {id} = request.params;

        const blog = await this.blogRepository.findOne({
            where: {id},
            relations:{
                author:true
            }
        })

        const authorId = blog.author.id;
        const userId = request.user.id;

        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })

        if (blog && userId && authorId === userId || user.role === "admin") {
            return true;
        } else false;
    }
}