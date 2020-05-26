
//类型
export class Category {
    _id?: string;
    name: string = '';
    parent?: string | Category = undefined;
}
//物品
export class Item {
    _id?: string;
    name: string = '';
    icon: string = '';
}

//以下均为英雄的模型
export class skill {
    _id?: string = '';
    icon: string = '';
    name: string = '';
    tip: string = '';
    description: string = '';
}
export class scores {
    difficult: number = 0;
    skill: number = 0 ;
    attack: number = 0;
    survive: number = 0;
}
export class partner {
    hero: string | Hero ='';
    description: string = '';
}
export class Hero {
    _id?: string;
    name: string ='';
    avatar: string = '';
    title: string = '';
    categories: Category[]=[];
    scores: scores = new scores();
    skills: skill[]=[];
    losingItems: string[] | Item[] = [];
    leadingItems: string[] | Item[] = [];
    usageTip: string = '';
    battelTip: string = '';
    teamTip: string = '';
    partners: partner[] = [];
}
//end

//文章
export class Article{
    categories: Category[] = []
    title: string = ''
    _id?: string
    content: string = ''
    createTime?: Date; 
    updateTime?: Date;
}
export class NewsListItem { 
    categoryName: string;
    categories: string[];
    title: string;
    updatedAt: string;
    _id: string;
    constructor(categoryName: string,categories:string[],_id:string, title: string, updatedAt: string) { 
        this.categoryName = categoryName;
        this.categories = categories
        this.title = title;
        this._id = _id;
        // let date = new Date(updatedAt)
        // this.updatedAt = `${date.getMonth()+1}/${date.getDate()}`
        this.updatedAt = updatedAt
    }
}

//广告
export class AdItem { 
    imgUrl: string = ''
    linkUrl: string = ''
}
export class Ad{ 
    _id?: string
    title: string = ''
    adItems: AdItem[] = []
}
export class Admin{ 
    _id?: string
    githubId?: string
    name: string = ''
    role:'user' | 'admin' ='user'
    password: string = ''
}
export var roles = ['user','admin']