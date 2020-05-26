import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import Article from "./article.model";
import * as fs from "fs";
import { v1 as uuidv1 } from "uuid";

@Injectable()
export default class ArticleService {
    constructor(
        @InjectModel(Article)
        private readonly ArticleModel: ReturnModelType<typeof Article>
    ) {}
    async getAllArticles(pageSize: number, page: number, sortBy: object) {
        return await this.ArticleModel.find()
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort(sortBy)
            .populate("categories");
    }

    async upload(file: any, body: object) {
        let uuid: string = uuidv1();
        let extName: string = file.originalname.split(".").pop();
        fs.writeFileSync(`static/${uuid}.${extName}`, file.buffer);
        return {
            filePath: `static/${uuid}.${extName}`,
        };
    }

    async create(ad: Article) {
        return await this.ArticleModel.create(ad);
    }

    async detail(id: string) {
        return await this.ArticleModel.findById(id);
    }

    async update(id: string, ad: Article) {
        return await this.ArticleModel.updateOne({ _id: id }, ad);
    }

    async _delete(id: string) {
        return await this.ArticleModel.findByIdAndDelete(id);
    }
}
