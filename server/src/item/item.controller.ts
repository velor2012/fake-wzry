import { Controller, Injectable, Get, UsePipes, Body, Param, Put, Delete, Post, Query, ValidationPipe, UseFilters, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import {FileInterceptor} from '@nestjs/platform-express'
import Item from './Item.model';
import * as fs from 'fs'
import { v1 as uuidv1 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import Auth from 'src/lib/decorator/auth.decorator';
import QueryDTO from 'src/lib/dto';
// import { ValidationPipe } from './Item.pipe';
import ItemService from './item.service';
@ApiTags('物品')
@Injectable()
@UsePipes(new ValidationPipe({transform:true}))
@Controller('items')
export default class ItemController {
        constructor(private readonly ItemService:ItemService) { }
        @Get()
        @Auth("获取所有物品")
        async getAllItems(@Query() query: QueryDTO) {
            let { page, pageSize, sortBy } = query
            let sb = {}
            sb[sortBy] = -1

            return await this.ItemService.getAllItems(pageSize,page,sb)
        }
            
        @Post()
        @Auth("创建物品",['admin'],"jwt")
        async create(@Body() body: Item) { 
            return await this.ItemService.create(body)
        }
    
        @Post('icons')
        @UseInterceptors(FileInterceptor('file'))
        @Auth("上传物品图标",['admin'],"jwt")
        async upload(@UploadedFile() file, @Body() body: Object) { 
            return await this.ItemService.upload(file,body)
        }
    
        @Get(':id')
        @Auth("获取物品详情")
        async detail(@Param('id') id: string) { 
            return await this.ItemService.detail(id)
        }
    
        @Put(':id')
        @Auth("更新物品",['admin'],"jwt")
        async update(@Param('id') id: string,@Body() body:Item) { 
            return await this.ItemService.update(id,body)
        }
    
        @Delete(':id')
        @Auth("删除物品",['admin'],"jwt")
        async _delete(@Param('id') id: string) { 
            return await this.ItemService._delete(id)
        }
    }
