import Hero from './hero.model';
import { Ref, prop, mongoose } from '@typegoose/typegoose';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { Schema } from 'mongoose';
export class Scores {
    //操作难度
    @ApiProperty({
		description: "操作难度",
		example: 1,
	})
    @prop()
    difficult: number
    //技能强度
    @ApiProperty({
		description: "技能强度",
		example: 1,
	})
    @prop()
    skill: number
    //进攻能力
    @ApiProperty({
		description: "进攻能力",
		example: 1,
	})
    @prop()
    attack: number
    //生存能力
    @ApiProperty({
		description: "生存能力",
		example: 1,
	})
    @prop()
    survive: number
    constructor(difficult:number=1,skill:number=1,attack:number=1,survive:number=1) { 
        this.difficult = difficult;
        this.skill = skill;
        this.attack = attack;
        this.survive = survive;
    }
}
export class Skill {
    //技能名称
    @ApiProperty({
		description: "技能名称",
		example: "惩戒射击",
	})
    @prop()
    name: string
    //冷却值
    @ApiProperty({
        description: "冷却时间，单位:秒",
        example: "1",
    })
    @prop()
    cd: string
    //消耗
    @ApiProperty({
        description: "消耗蓝量等",
        example: "10",
    })
    @prop()
    cost: string
    //技能描述
    @prop()
    @ApiProperty({
		description: "技能描述",
		example: "一段话..",
	})
    description: string
    //图标
    @ApiProperty({
		description: "技能图标的路径",
		example: "https://xx.xx.jpg",
	})
    @prop()
    icon: string
    //技能使用的小技巧
    @ApiProperty({
        required:false,
		description: "技能使用的小技巧",
		example: "技能使用的小技巧",
	})
    @prop({required:false})
    tip?: string
    constructor(name:string='',description:string='',icon:string='',tip:string='',cost:string="5",cd:string="5") { 
        this.name = name;
        this.tip = tip;
        this.icon = icon;
        this.description = description;
        this.cost = cost;
        this.cd = cd
    }
}

export class Partner { 
    //英雄id
    @ApiProperty({
        required:false,
		description: "搭档英雄的id",
        example: "5ea9c0b37c0f32050d5bf787",
    }) 
    @prop({ ref: "Hero"})
    hero: Ref<Hero>
    //描述
    @prop()
    @ApiProperty({
		description: "技能描述",
		example: "一段话..",
	})   
    description: string

    constructor(hero: Ref<Hero> = null, description='') { 
        this.hero = hero
        this.description=description
    }
}