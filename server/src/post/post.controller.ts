import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Injectable } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePostDto } from './creatPost.dto';
import { UpdatePostDto } from './updatePost.dto';
import { Post as PostSchema } from './post.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
@Controller('post')
@UsePipes(new ValidationPipe())
export class PostController {
    constructor(@InjectModel(PostSchema) private readonly PostModel: ReturnModelType<typeof PostSchema>) { }
    @Get()
    @ApiOperation({summary:"获取所有文章"})
    async index() {
        return await this.PostModel.find()
    }
    @Post()
    @ApiOperation({summary:"创建文章"})
    async create(@Body() body:CreatePostDto) { 
        return await this.PostModel.create(body)
    }
    @Get(':id')
    @ApiOperation({summary:"获取文章详情"})
    async deatil(@Param('id') id: string) { 
        return await this.PostModel.findById(id)
    }
    @Put(':id')
    @ApiOperation({summary:"更新文章"})
    async update(@Param('id') id: string,@Body() body:UpdatePostDto) { 
        return await this.PostModel.updateOne({_id:id},body)
    }
    @Delete(':id')
    @ApiOperation({summary:"删除文章"})
    async _delete(@Param('id') id: string) { 
        return await this.PostModel.findByIdAndDelete(id)
    }
}
