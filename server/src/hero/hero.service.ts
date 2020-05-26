import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import Hero from "./hero.model";
import * as fs from 'fs'
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export default class HeroService {
    constructor(@InjectModel(Hero) private readonly HeroModel: ReturnModelType<typeof Hero>) { }
    async getAllHeros(pageSize: number, page: number, sortBy: object) {
        return await this.HeroModel.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1))
            .sort(sortBy)
            .populate('categories')
            ;
    }
  
    async create(hero:Hero) { 
        return await this.HeroModel.create(hero)
    }
    
    async upload(file:any,body:object) {
        let uuid:string = uuidv1()
        let extName:string = file.originalname.split('.').pop()
        fs.writeFileSync(`static/${uuid}.${extName}`,file.buffer)
        return {
            filePath:`static/${uuid}.${extName}`
        }
    }   

    async detail(id: string, populate: boolean = false) { 
        if (populate) {
            return await this.HeroModel.findById(id).populate('categories losingItems leadingItems').populate('partners.hero','avatar name')
        } else { 
            return await this.HeroModel.findById(id)
        }

    }

    async update(id: string,hero:Hero) { 
        return await this.HeroModel.updateOne({_id:id},hero)
    }

    async _delete(id: string) { 
        return await this.HeroModel.findByIdAndDelete(id)
    }
}