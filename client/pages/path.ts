export var mypath: MyPath = {
    categoryPath: {
        create: "/category/create",
        list: "/category/List",
        getEditPath(id: string): string {
            return `/category/edit/${id}`;
        },
    },
    itemPath: {
        create: "/item/create",
        list: "/item/List",
        getEditPath(id: string): string {
            return `/item/edit/${id}`;
        },
    },
    heroPath: {
        create: "/hero/create",
        list: "/hero/List",
        getEditPath(id: string): string {
            return `/hero/edit/${id}`;
        },
    },
    articlePath: {
        create: "/article/create",
        list: "/article/List",
        getEditPath(id: string): string {
            return `/article/edit/${id}`;
        },
    },
    adPath: {
        create: "/ad/create",
        list: "/ad/List",
        getEditPath(id: string): string {
            return `/ad/edit/${id}`;
        },
    },
    adminPath: {
        create: "/admin/create",
        list: "/admin/List",
        getEditPath(id: string): string {
            return `/admin/edit/${id}`;
        },
    },
    loginPath: "/login",
    other: {},
};
