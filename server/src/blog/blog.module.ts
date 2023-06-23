import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Blog} from "./blog.model";

@Module({
  imports: [TypeOrmModule.forFeature([Blog]),],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
