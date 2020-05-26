import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import Ad from "./ad.model";
import * as fs from 'fs'
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export default class AdService {
    constructor(@InjectModel(Ad) private readonly AdModel: ReturnModelType<typeof Ad>) { }
    async getAllAds(pageSize: number, page: number, sortBy: object) {
        return await this.AdModel.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort(sortBy);
    }

    async upload(file:any,body:object) {
        let uuid:string = uuidv1()
        let extName:string = file.originalname.split('.').pop()
        fs.writeFileSync(`static/${uuid}.${extName}`,file.buffer)
        return {
            filePath:`static/${uuid}.${extName}`
        }
    }       

    async create(ad:Ad) { 
        return await this.AdModel.create(ad)
    }

    async detail(id: string) { 
        return await this.AdModel.findById(id)
    }

    async update(id: string,ad:Ad) { 
        return await this.AdModel.updateOne({_id:id},ad)
    }

    async _delete(id: string) { 
        return await this.AdModel.findByIdAndDelete(id)
    }
}