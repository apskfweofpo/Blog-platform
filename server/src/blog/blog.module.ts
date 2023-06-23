import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Blog} from "./blog.model";
import {FilesModule} from "../files/files.module";
import {User} from "../users/users.model";

@Module({
  imports: [
      TypeOrmModule.forFeature([Blog, User]),
      FilesModule
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
