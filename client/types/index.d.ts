interface IHeroPath { 
    create: string,
    list: string,
    getEditPath(id: string): string
}
interface IItemPath { 
    create: string,
    list: string,
    getEditPath(id: string): string
}
interface ICategoryPath { 
    create: string,
    list: string,
    getEditPath(id: string): string
}
interface IArticlePath { 
    create: string,
    list: string,
    getEditPath(id: string): string
}
interface IAdPath { 
    create: string,
    list: string,
    getEditPath(id: string): string
}
interface IAdminPath { 
    create: string,
    list: string,
    getEditPath(id: string): string
}
declare class MyPath { 
    categoryPath: ICategoryPath
    itemPath: IItemPath
    heroPath: IHeroPath
    articlePath: IArticlePath
    adPath: IAdPath
    adminPath: IAdminPath
    loginPath: string
    other: any
}
// declare class Vditor { 
//     static highlightRender(option?: object,document:any)
//     constructor(which: string, option?: object)
// }
// declare var VueEditor:any

