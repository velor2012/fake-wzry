import { ApiProperty } from "@nestjs/swagger";
import { isString } from "util";
import { IsString, IsNotEmpty } from "class-validator"
export class UpdatePostDto {
  // @ApiProperty({description:"文章标题",example:"文章标题"})
  // readonly title: string;
  @ApiProperty({ description: "文章详情", example: "文章内容" })
  @IsString({message:"文章详情必须是字符串"})
  @IsNotEmpty({message:"文章详情不能为空"})
  readonly content: string;
  @ApiProperty({ description: "文章简介", example: "文章简介" })
  @IsString({message:"文章简介必须是字符串"})
  @IsNotEmpty({message:"文章简介不能为空"})
  readonly resume: string;
  }