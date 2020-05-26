import { Controller, Injectable, Get, UsePipes, Body, Param, Put, Delete, Post, Query, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import Category from './category.model';
import Auth from 'src/lib/decorator/auth.decorator';
import QueryDTO from 'src/lib/dto';
import CategoryService from './category.service';


@ApiTags('分类')
@Injectable()
@UsePipes(new ValidationPipe({transform:true}))
@Controller('categories')
export default class CategoryController {
    constructor(
    private readonly CategoryService: CategoryService
    ) { }
        @Get()
        @Auth("获取所有分类") 
        async index(@Query() query: QueryDTO) {
            let { page, pageSize, sortBy,where } = query
            let sb = {}
            sb[sortBy] = -1
            let queryOption = {}
            if (pageSize>0 && page>0) {
                queryOption = {
                    limit: pageSize,
                    skip: pageSize * (page - 1)
                }
            }
            return await this.CategoryService.getAllCategories(where,queryOption,sb)
        }
    
        @Get('heroCategories')
        @Auth("获取所有的英雄分类") 
        async getAllHeroes() {
            return await this.CategoryService.getHerosCategories()
        }       
       
        @Get('notHeroCategories')
        @Auth("获取所有的与英雄无关的分类,即分类本身和父分类都不是英雄") 
        async getNotHeroCategories() {
            return await this.CategoryService.getNotHeroCategories();
        } 
    
        @Get('parents')
        @Auth("获取所有的父级分类") 
        async getAllParents() {
            return await this.CategoryService.getAllParents()
        }       
        @Post()
        @Auth("创建分类",['admin'],"jwt") 
        async create(@Body() body:Category) { 
            return await this.CategoryService.create(body)
        }
    
        @Get(':id')
        @Auth("获取分类详情") 
        async deatil(@Param('id') id: string) { 
            return await this.CategoryService.detail(id)
        }
    
        @Put(':id')
        @Auth("更新分类",['admin'],"jwt")
        async update(@Param('id') id: string,@Body() body:Category) { 
            return await this.CategoryService.update(id,body)
        }
        @Delete(':id')
        @Auth("删除分类",['admin'],"jwt")
        async _delete(@Param('id') id: string) { 
            return await this.CategoryService._delete(id)
        }
    }
