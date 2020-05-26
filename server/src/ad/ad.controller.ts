import { Controller, Injectable, Get, UsePipes, Body, Param, Put, Delete, Post, Query, ValidationPipe, UseFilters, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express'
import Ad from './ad.model';
import Auth from 'src/lib/decorator/auth.decorator';
import QueryDTO from 'src/lib/dto';
import AdService from './ad.service';
@ApiTags('广告')
@Injectable()
@UsePipes(new ValidationPipe({transform:true}))
@Controller('ads')
export default class AdController {
    constructor(private readonly AdService: AdService) { }
    
        @Get()
        @Auth("获取所有广告")   
        async getAllAds(@Query() query: QueryDTO) {
            let { page, pageSize, sortBy } = query
            let sb = {}
            sb[sortBy] = -1
            // let total = await this.AdModel.countDocuments({})
            return await this.AdService.getAllAds(pageSize,page,sb)
        }
            
        @Post()
        @Auth("创建广告",['admin'],"jwt")   
        async create(@Body() body: Ad) { 
            return await this.AdService.create(body)
        }
    
        @Post('img')
        @UseInterceptors(FileInterceptor('image'))
        @Auth("上传广告图片",['admin'],"jwt")     
        async upload(@UploadedFile() file, @Body() body: Object) { 
            return await this.AdService.upload(file,body)
        }
    
        @Get(':id')
        @Auth("获取广告详情")     
        async detail(@Param('id') id: string) { 
            return await this.AdService.detail(id)
        }
    
        @Put(':id')
        @Auth("更新广告",['admin'],"jwt")
        async update(@Param('id') id: string,@Body() body:Ad) { 
            return await this.AdService.update(id,body)
        }
    
        @Delete(':id')
        @Auth("删除广告",['admin'],"jwt")
        async _delete(@Param('id') id: string) { 
            return await this.AdService._delete(id)
        }
    }