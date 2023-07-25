import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EntityManager, Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly entityManager: EntityManager,
  ) {}

  async create(name: string, createProductDto: CreateProductDto) {
    const category = await this.categoriesService.findOne(name);

    const product = new Product(createProductDto);
    product.name = product.name.toLowerCase();
    product.category = category;

    const savedProduct = this.entityManager.save(product);
    delete (await savedProduct).category;

    return savedProduct;
  }

  async findOne(pname: string) {
    pname = pname.toLowerCase();
    const product = await this.productsRepository.findOneBy({ name: pname });

    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.BAD_REQUEST);
    }

    return product;
  }
}
