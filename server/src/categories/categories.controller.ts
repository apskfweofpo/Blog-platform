import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/createCategoryDto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {RolesGuard} from "../guards/roles.guard";
import {Roles} from "../decorators/roles.decorator";

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('create')
    addOne(
        @Body() category: CreateCategoryDto
    ) {
        return this.categoriesService.createCategory(category)
    }

    @Get('')
    getAll() {
        return this.categoriesService.getAll()
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('/:id')
    removeCategory(
        @Param('id') id: number
    ) {
        return  this.categoriesService.remove(id)
    }
}
