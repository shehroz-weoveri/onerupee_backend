import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Patch()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return this.categoriesService.findOne(name);
  }

  @Post()
  async findCategoryAndParticipation(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.findParticipation(updateCategoryDto);
  }
}
