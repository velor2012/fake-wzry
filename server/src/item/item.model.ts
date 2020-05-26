import { prop, Ref } from '@typegoose/typegoose';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export default class Item {
    @ApiProperty({ description: '物品名称', example: '极速之鞋' })
    @IsString({message:"物品名称必须是字符串"})
    @IsNotEmpty({message:"物品名称不能为空"})
    @prop()
    public name: string;
    
    @ApiProperty({ description: '图标的路径', example: 'http://xxx.xxx.xxx/xx.jpg' })
    @IsString({message:"图标的路径必须是字符串"})
    @IsNotEmpty({message:"图标的路径不能为空"})
    @prop()
    public icon: string;

    constructor(name: string = '', icon: string = '') { 
        this.name = name;
        this.icon = icon;
    }
  }