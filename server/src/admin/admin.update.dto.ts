import { prop, arrayProp } from '@typegoose/typegoose';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt'
export default class AdminUpdateDto {
    @IsOptional()
    @ApiProperty({ description: '管理员名称', example: 'velor2012' })
    @IsString({message:"管理员名称必须是字符串"})
    @prop({required:false})
    public name?: string;
    
    @ApiProperty({ required: false, description: '管理员密码', example: "123456" })
    @IsOptional()
    @IsString({ message: "管理员密码必须是字符串" })
    @prop({
        required: false,
        set: (val:string):string =>  bcrypt.hashSync(val,10),
        get: (val: string): string => val,
        select: false
    })
    public password?: string

    @IsOptional()
    @IsString({ message: "githubId必须是字符串" })
    @ApiProperty({required: false, description: 'githubId', example: "123456"})
    @prop({
        required: false,
    })
    public githubId?: string

    @IsOptional()
    @IsString({ message: "管理员角色必须是字符串" })
    @ApiProperty({required: false, description: '管理员的角色', example: "admin|user"})
    @prop({
        required: false,
        enum:['admin','user']
    })
    public role?: string
  }