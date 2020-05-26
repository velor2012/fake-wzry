export class ListCard  { 
    title: string;
    icon: string;
    categories: ListCardCategory[];
    constructor(title: string, icon: string, categories: ListCardCategory[]) { 
        this.title = title;
        this.icon = icon;
        this.categories = categories;
    }
}
export class ListCardCategory { 
    name: string;
    listItems: any[];
    constructor(name: string, listItems: any[]) { 
        this.name = name;
        this.listItems = listItems;
    }
}