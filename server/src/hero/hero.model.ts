import { prop, Ref, mongoose, arrayProp } from '@typegoose/typegoose';
import { IsString, IsNotEmpty, IsObject, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import Category from "src/category/category.model";
import Item from "../item/item.model";
import { Scores, Skill, Partner } from './types';
export default class Hero {
    @ApiProperty({ description: "英雄名称", example: "亚瑟" })
    @IsString({ message: "英雄名称必须是字符串" })
    @IsNotEmpty({ message: "英雄名称不能为空" })
    @prop()
    public name: string;

    @ApiProperty({
        description: "头像的路径",
        example: "http://xxx.xxx.xxx/xx.jpg",
    })
    @IsString({ message: "头像的路径必须是字符串" })
    @IsNotEmpty({ message: "头像的路径不能为空" })
    @prop()
    public avatar: string;

    @IsString({ message: "背景的路径必须是字符串" })
    @IsNotEmpty({ message: "背景的路径不能为空" })
    @prop()
    public background: string;

    @ApiProperty({ description: "称号", example: "骑士之力" })
    @IsString({ message: "称号必须是字符串" })
    @IsNotEmpty({ message: "称号不能为空" })
    @prop()
    public title: string;

    @ApiProperty({ description: "英雄类型", example: "战士" })
    @IsArray({ message: "英雄类型必须是某个已知的类型的id字符串组成的数组" })
    @IsNotEmpty({ message: "英雄类型不能为空" })
    @arrayProp({ ref: "Category",required:true })
    public categories: Ref<Category>[];

    @ApiProperty({
        description: "英雄的各项分数(操作难度,生存,进攻等)",
        example:
            "{difficult: number,skill: number,acttack: number,suvive: number}",
    })
    @IsObject({ message: "各项分数必须是一个对象" })
    @IsNotEmpty({ message: "各项分数不能为空" })
    @prop()
    public scores: Scores;

    @ApiProperty({
        description: "技能数组",
        example: "[誓约之盾，回旋打击...](数组里面保存技能的id)",
        type: [Skill]
    })
    @IsArray({ message: "技能数组必须是数组类型，里面包含技能类" })
    @IsNotEmpty({ message: "技能不能为空" })
    @arrayProp({ items: Skill })
    public skills: Skill[];

    @ApiProperty({
        description: "顺风出装，一个包含物品类对象的id的数组",
        example: "[抵抗之靴,红莲斗篷...](数组里面保存物品的id)",
        type: [mongoose.Types.ObjectId]
    })
    @IsArray({ message: "出装必须是数组类型，里面包含物品类对象" })
    @IsNotEmpty({ message: "技能不能为空" })
    @arrayProp({ ref: Item })
    public losingItems: Ref<Item>[];

    @ApiProperty({
        description: "逆风出装，一个包含物品类对象的id的数组",
        example: "[抵抗之靴,暗影战斧...](数组里面保存物品的id)",
        type: [mongoose.Types.ObjectId]
    })
    @IsArray({ message: "出装必须是数组类型，里面包含物品类对象" })
    @IsNotEmpty({ message: "技能不能为空" })
    @arrayProp({ ref: Item })
    public leadingItems: Ref<Item>[];

    @ApiProperty({ description: "使用技巧", example: "无" })
    @IsString({ message: "使用技巧必须是字符串" })
    @IsNotEmpty({ message: "使用技巧不能为空" })
    @prop()
    public usageTip: string;

    @ApiProperty({ description: "对抗技巧", example: "无" })
    @IsString({ message: "对抗技巧必须是字符串" })
    @IsNotEmpty({ message: "对抗技巧不能为空" })
    @prop()
    public battleTip: string;

    @ApiProperty({ description: "团战技巧", example: "无" })
    @IsString({ message: "团战技巧必须是字符串" })
    @IsNotEmpty({ message: "团战技巧不能为空" })
    @prop()
    public teamTip: string;

    @ApiProperty({
        description: "推荐的搭档",
        example: "[鲁班七号,阿珂](数组里面保存英雄的id)",
        type: [Partner]
    })
    @IsArray({ message: "搭档必须是数组，里面的元素为英雄的id" })
    @IsNotEmpty({ message: "搭档不能为空" })
    @arrayProp({ items: Partner })
    public partners: Partner[];
    
    constructor(name: string, avatar: string, title: string, categories: Ref<Category>[], scores: Scores,
        skills: Skill[], losingItems: Ref<Item>[], leadingItems: Ref<Item>[], usageTip: string, battleTip: string,
        teamTip: string,partners: Partner[],background: string
    ) { 
        this.name = name;
        this.avatar = avatar;
        this.title = title;
        this.categories = categories;
        this.scores = scores;
        this.skills = skills;
        this.losingItems = losingItems;
        this.leadingItems = leadingItems;
        this.usageTip = usageTip;
        this.battleTip = battleTip;
        this.teamTip = teamTip;
        this.partners = partners;
        this.background = background
    }
}
