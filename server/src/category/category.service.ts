import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import Category from "./category.model";

@Injectable()
export default class CategoryService {
    constructor(@InjectModel(Category) private readonly CategoryModel: ReturnModelType<typeof Category>) { }
    async getAllCategories(where: string, options: object, sortBy: object) {
        return await this.CategoryModel.find(JSON.parse(where)).setOptions(options)
            .populate('parent')
            .sort(sortBy);
    }

    async getHerosCategories() { 
                   //必须使用lookup，populate为模拟联合查询，本质为多次单表搜索，不能对联合的文档搜索
                   return await this.CategoryModel.aggregate(
                    [
                      { "$lookup": {
                        "from": "categories",
                        "localField": "parent",
                        "foreignField": "_id",
                        "as": "parents"
                      }},
                        { "$match": { "parents.name": "英雄" } },
                        {
                            "$project": {
                                "_id": 1,
                                "parent": 1,
                                "name": 1,
                            }
                        }
                    ]
                  )
    }

    async getNotHeroCategories() { 
        //必须使用lookup，populate为模拟联合查询，本质为多次单表搜索，不能对联合的文档搜索
        return await this.CategoryModel.aggregate(
            [
              { "$lookup": {
                "from": "categories",
                "localField": "parent",
                "foreignField": "_id",
                "as": "parents"
              }},
                { "$match": { "$and": [{ "parents.name": { "$ne": "英雄" } }, { "name": { "$ne": "英雄" } }] } },
                {
                    "$project": {
                        "_id": 1,
                        "parent": 1,
                        "name": 1,
                    }
                }
            ]
          )
    }

    async getAllParents() {
        return await this.CategoryModel.find({parent:{$eq:null}})
    }       

    async create(category:Category) { 
        return await this.CategoryModel.create(category)
    }

    async detail(id: string) { 
        return await this.CategoryModel.findById(id)
    }

    async update(id: string,category:Category) { 
        return await this.CategoryModel.updateOne({_id:id},category)
    }

    async _delete(id: string) { 
        return await this.CategoryModel.findByIdAndDelete(id)
    }
}