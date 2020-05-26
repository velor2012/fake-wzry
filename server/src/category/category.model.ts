import { prop, Ref, arrayProp } from '@typegoose/typegoose';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import Article from 'src/article/article.model';
@ApiExtraModels()
export default class Category {
    @ApiProperty({ description: '类别名称', example: '类别名称' })
    @IsString({message:"类别名称必须是字符串"})
    @IsNotEmpty({message:"类别名称不能为空"})
    @prop()
    public name: string;
    @ApiProperty({required:false, description: '父级分类', example: '父级分类名称'})
    @prop({ ref: "Category" })
    public parent?: Ref<Category>;

    @arrayProp({
        ref: () => Category,
        foreignField: 'parent', // compare this value to the local document populate is called on
        localField: '_id' // compare this to the foreign document's value defined in "foreignField"
      })
    public children: Ref<Category>[];

    @arrayProp({
        ref: () => Article,
        foreignField: 'categories', // compare this value to the local document populate is called on
        localField: '_id' // compare this to the foreign document's value defined in "foreignField"
      })
    public newsList: Ref<Article>[];
  }