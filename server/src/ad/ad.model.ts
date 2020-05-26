import { prop, arrayProp } from '@typegoose/typegoose';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { adItem } from './types';
@ApiExtraModels()
export default class Ad {
    @ApiProperty({ description: '广告位名称', example: '首页幻灯片轮播图' })
    @IsString({message:"广告位名称必须是字符串"})
    @IsNotEmpty({message:"广告位名称不能为空"})
    @prop({required:true})
    public title: string;
    
    @ApiProperty({
        required: true, description: '文章分类', example: "[{imgUrl:'http://xxx.xx.jpg',linkUrl:'http://xxx.xx.jpg'}]"
        , type: [adItem]
    })
    @IsArray({message:"广告位的广告数据必须是数组类型"})
    @IsNotEmpty({message:"广告位的广告数据不能为空"})
    @arrayProp({ items: adItem ,required:true})
    public adItems: adItem[]
  }