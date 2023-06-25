import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/createCategoryDto";

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {
    }

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

    @Delete('/:id')
    removeCategory(
        @Param('id') id: number
    ) {
        return  this.categoriesService.remove(id)
    }
}
