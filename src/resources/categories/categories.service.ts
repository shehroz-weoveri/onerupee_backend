import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    createCategoryDto.name = createCategoryDto.name.toLowerCase();
    const category = new Category({ ...createCategoryDto, products: [] });

    return this.entityManager.save(category);
  }

  async findAll() {
    return this.categoriesRepository.find({ relations: { products: true } });
  }

  async findOne(name: string) {
    name = name.toLowerCase();
    const category = await this.categoriesRepository.findOne({
      where: { name },
      relations: { products: true },
    });

    if (!category) {
      throw new HttpException('Category not found.', HttpStatus.BAD_REQUEST);
    }

    return category;
  }
}
