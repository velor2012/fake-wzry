import { Controller, Injectable, Get, UsePipes, Body, Param, Put, Delete, Post, Query, ValidationPipe, UseFilters, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express'
import Hero from './Hero.model';
import Auth from 'src/lib/decorator/auth.decorator';
import QueryDTO from 'src/lib/dto';
// import { ValidationPipe } from './Hero.pipe';
import HeroService from './hero.service';
@ApiTags('英雄')
@Injectable()
@UsePipes(new ValidationPipe({transform:true}))
@Controller('heroes')
export default class HeroController {
        constructor(private readonly HeroService:HeroService) { }
        @Get()
        @Auth("获取所有英雄")
        async getAllHeros(@Query() query: QueryDTO) {
            let { page, pageSize, sortBy } = query
            let sb = {}
            sb[sortBy] = -1
            // let total = await this.HeroModel.countDocuments({})
            return await this.HeroService.getAllHeros(pageSize,page,sb)
        }
            
        @Post()
        @Auth("创建英雄",['admin'],"jwt")
        async create(@Body() body: Hero) { 
            return await this.HeroService.create(body)
        }
        @Post('avatar')
        @UseInterceptors(FileInterceptor('file'))
        @Auth("上传英雄头像",['admin'],"jwt")
        async upload(@UploadedFile() file, @Body() body: Object) { 
            return await this.HeroService.upload(file,body)
        }
    
        @Post('skillIcons')
        @UseInterceptors(FileInterceptor('file'))
        @Auth("上传技能图标",['admin'],"jwt")
        async uploadSkillIcon(@UploadedFile() file, @Body() body: Object) { 
            return await this.HeroService.upload(file,body)
        }
    
        @Get(':id')
        // @Auth("获取英雄详情")
        async detail(@Param('id') id: string,@Query('populate') populate: boolean) { 
            return await this.HeroService.detail(id,populate)
        }
    
        @Put(':id')
        @Auth("更新英雄",['admin'],"jwt")
        async update(@Param('id') id: string,@Body() body:Hero) { 
            return await this.HeroService.update(id,body)
        }
    
        @Delete(':id')
        @Auth("删除英雄",['admin'],"jwt")
        async _delete(@Param('id') id: string) { 
            return await this.HeroService._delete(id)
        }
    }
