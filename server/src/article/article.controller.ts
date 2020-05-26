import { Controller, Injectable, Get, UsePipes, Body, Param, Put, Delete, Post, Query, ValidationPipe, UseFilters, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express'
import Article from './article.model';
import Auth from 'src/lib/decorator/auth.decorator';
import QueryDTO from 'src/lib/dto';
import ArticleService from './article.service';

@ApiTags('文章')
@Injectable()
@UsePipes(new ValidationPipe({transform:true}))
@Controller('articles')
export default class ArticleController {
        constructor(private readonly ArticleService:ArticleService) { }
        @Get()
        @Auth("获取所有文章")
        async getAllArticles(@Query() query: QueryDTO) {
            let { page, pageSize, sortBy } = query
            let sb = {}
            sb[sortBy] = -1
            // let total = await this.ArticleModel.countDocuments({})
            return await this.ArticleService.getAllArticles(pageSize,page,sb)
        }
            
        @Post()
        @Auth("创建文章",['admin'],"jwt")
        async create(@Body() body: Article) { 
            return await this.ArticleService.create(body)
        }
    
        @Post('img')
        @UseInterceptors(FileInterceptor('image'))
        @Auth("上传文章图片",['admin'],"jwt")
        async upload(@UploadedFile() file, @Body() body: Object) { 
            return await this.ArticleService.upload(file,body)
        }
    
        @Get(':id')
        @Auth("获取文章详情")
        async detail(@Param('id') id: string) { 
            return await this.ArticleService.detail(id)
        }
    
        @Put(':id')
        @Auth("更新文章",['admin'],"jwt")
        async update(@Param('id') id: string,@Body() body:Article) { 
            return await this.ArticleService.update(id,body)
        }
    
        @Delete(':id')
        @Auth("删除文章",['admin'],"jwt")
        async _delete(@Param('id') id: string) { 
            return await this.ArticleService._delete(id)
        }
    }
