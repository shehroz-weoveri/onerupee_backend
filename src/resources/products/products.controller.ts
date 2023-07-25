import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('categories/:name')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Param('name') name: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(name, createProductDto);
  }

  @Get(':pname')
  findOne(@Param('pname') pname: string) {
    return this.productsService.findOne(pname);
  }
}
