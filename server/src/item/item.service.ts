import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import Item from "./item.model";
import * as fs from 'fs'
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export default class ItemService {
    constructor(@InjectModel(Item) private readonly ItemModel: ReturnModelType<typeof Item>) { }
    async getAllItems(pageSize: number, page: number, sortBy: object) {
        return await this.ItemModel.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort(sortBy);
    }
  
    async create(item:Item) { 
        return await this.ItemModel.create(item)
    }
    
    async upload(file:any,body:object) {
        let uuid:string = uuidv1()
        let extName:string = file.originalname.split('.').pop()
        fs.writeFileSync(`static/${uuid}.${extName}`,file.buffer)
        return {
            filePath:`static/${uuid}.${extName}`
        }
    }   

    async detail(id: string) { 
        return await this.ItemModel.findById(id)
    }

    async update(id: string,item:Item) { 
        return await this.ItemModel.updateOne({_id:id},item)
    }

    async _delete(id: string) { 
        return await this.ItemModel.findByIdAndDelete(id)
    }
}