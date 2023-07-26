import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EntriesService } from '../entries/entries.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly entriesService: EntriesService,
    private readonly usersService: UsersService,
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

  async findParticipation(updateCategoryDto: UpdateCategoryDto) {
    console.log(updateCategoryDto.email);

    const user = await this.usersService.findByEmail(updateCategoryDto.email);

    const productsData = await this.categoriesRepository.find({
      relations: { products: true },
    });

    const entriesByUser = await this.entriesService.findEntriesForUser(user.id);

    console.log(productsData, entriesByUser);

    productsData.forEach((category) => {
      category.products.forEach((product) => {
        product.participated = entriesByUser.find(
          (entry) => entry.productId === product.id,
        )
          ? true
          : false;
      });
    });
    return productsData;
  }
}
