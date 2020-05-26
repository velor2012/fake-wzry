import { prop, Ref, arrayProp, mongoose } from '@typegoose/typegoose';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import Category from 'src/category/category.model';
import { TimeStamps,Base } from '@typegoose/typegoose/lib/defaultClasses';
@ApiExtraModels()
export default class Article  extends TimeStamps{
    @ApiProperty({required: true, description: '文章标题', example: '文章标题' })
    @IsString({message:"文章标题必须是字符串"})
    @IsNotEmpty({message:"文章标题不能为空"})
    @prop({required: true,})
    public title: string;
    
    @ApiProperty({ required: true, description: '文章分类', example: '文章分类名称' })
    @IsArray({message:"文章分类必须是数组类型"})
    @IsNotEmpty({message:"文章分类不能为空"})
    @arrayProp({ ref: "Category",required:true })
    public categories: Ref<Category>[];
    
    @ApiProperty({ required: true, description: '文章内容', example: '文章内容' })
    @IsString({message:"文章内容必须是字符串"})
    @IsNotEmpty({message:"文章内容不能为空"})
    @prop({required: true,})
    public content:string;
  }