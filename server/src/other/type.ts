import Article from 'src/article/article.model';
import { Document } from 'mongoose';
export default class MyList { 
    name: string;
    listItems: New[];
}
export class New extends Document { 
    categories: string[]
    categoryName:string
    title: string
    updatedAt: Date
    createdAt: Date
}