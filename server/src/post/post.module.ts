import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Post } from './post.model';
import { PostController } from './post.controller';

@Module({
    imports: [
        TypegooseModule.forFeature([Post]),
    ],
    controllers: [PostController],
})
export class PostModule {}
