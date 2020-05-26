import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import Category from './category.model';
import CategoryController from './category.controller';
import Article from 'src/article/article.model';
import CategoryService from './category.service';

@Module({
    imports: [
        TypegooseModule.forFeature([Category]),
        TypegooseModule.forFeature([Article]),
    ],
    providers:[CategoryService],
    controllers: [CategoryController],
    exports:[CategoryService]
})
export class CategoryModule {}
