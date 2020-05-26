//类型
export class Category {
    _id?: string;
    name: string = '';
    parent?: string | Category = null;
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
    cost: string = "5";
    cd:string = "5"
}
export class scores {
    difficult: number = 0;
    skill: number = 0 ;
    attack: number = 0;
    survive: number = 0;
}
export class partner {
    hero: string | Hero = null;
    description: string = '';
}
export class Hero {
    _id?: string;
    name: string ='';
    avatar: string = '';
    background: string = '';
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
}
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