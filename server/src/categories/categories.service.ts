import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Category} from "./category.model";
import {CreateCategoryDto} from "./dto/createCategoryDto";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {
    }

    async createCategory(category: CreateCategoryDto): Promise<Category> {
        return  this.categoryRepository.save(category)
    }

    async getAll() : Promise<Category[]> {
        return this.categoryRepository.find()
    }

    async remove(id: number) {
        const category = await this.categoryRepository.findOne({
            where: {id}
        })
        if(!category){
            throw new NotFoundException(`Category with id ${id} not found`)
        }

        return this.categoryRepository.remove(category)
    }
}
