import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './resources/users/users.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { ProductsModule } from './resources/products/products.module';
import { EntriesModule } from './resources/entries/entries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';


@Module({
  imports: [
    ConfigModule.forRoot(
    {
      envFilePath: ['.env'],
      ignoreEnvFile: false,
      isGlobal: true,
    }
  ),
  TypeOrmModule.forRoot(config), 
  UsersModule, 
  CategoriesModule, 
  ProductsModule, 
  EntriesModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
