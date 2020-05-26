import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import OtherController  from './other.controller';
import Category from 'src/category/category.model';
import Article from '../article/article.model';
import Hero from '../hero/hero.model';
import { CategoryModule } from '../category/category.module';

@Module({
    imports: [
        TypegooseModule.forFeature([Category]),
        TypegooseModule.forFeature([Article]),
        TypegooseModule.forFeature([Hero]),
        CategoryModule
    ],
    controllers:[OtherController]
})
export class OtherModule {}
