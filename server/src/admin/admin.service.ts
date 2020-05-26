import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import Admin from "./admin.model";
import * as fs from 'fs'
import { v1 as uuidv1 } from 'uuid';
import AdminUpdateDto from "./admin.update.dto";

@Injectable()
export default class AdminService {
    constructor(@InjectModel(Admin) private readonly AdminModel: ReturnModelType<typeof Admin>) { }
    async getAllAdmins(pageSize: number, page: number, sortBy: object) {
        return await this.AdminModel.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort(sortBy);
    }
  
    async create(admin:Admin) { 
        return await this.AdminModel.create(admin)
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
        return await this.AdminModel.findById(id)
    }

    async update(id: string,admin:AdminUpdateDto) { 
        return await this.AdminModel.updateOne({_id:id},admin)
    }

    async _delete(id: string) { 
        return await this.AdminModel.findByIdAndDelete(id)
    }
}