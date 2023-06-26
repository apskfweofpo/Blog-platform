import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/createCategoryDto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {RolesGuard} from "../guards/roles.guard";
import {Roles} from "../decorators/roles.decorator";
import {ApiOkResponse} from "@nestjs/swagger";
import {Category, CreateCategoryResponse, RemoveCategoryResponse} from "./types";

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {
    }

    @ApiOkResponse({type: CreateCategoryResponse})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('create')
    addOne(
        @Body() category: CreateCategoryDto
    ) {
        return this.categoriesService.createCategory(category)
    }

    @ApiOkResponse({type: [Category]})
    @Get('')
    getAll() {
        return this.categoriesService.getAll()
    }

    @ApiOkResponse({type: RemoveCategoryResponse})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('/:id')
    removeCategory(
        @Param('id') id: number
    ) {
        return this.categoriesService.remove(id)
    }
}
