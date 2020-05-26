import { ApiProperty } from "@nestjs/swagger"
import { prop } from "@typegoose/typegoose"
import { IsNotEmpty, IsString } from "class-validator"

export class adItem{ 
    @ApiProperty({
		description: "广告的某一张图片",
        example: "http://xxx.xx.jpg",
    })
    @IsNotEmpty({message:"广告图片的路径不能为空"})
    @IsString({message:"广告图片的路径必须是字符串"})
    @prop({required:true})
    imgUrl: string


    @ApiProperty({
		description: "广告图片的链接",
		example: "http://xxx.xx.jpg",
    })
    @IsNotEmpty({message:"广告图片的链接不能为空"})
    @IsString({message:"广告图片的链接必须是字符串"})
    @prop({required:true})
    linkUrl: string
}