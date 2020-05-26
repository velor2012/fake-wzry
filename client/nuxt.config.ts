import MyAdminAPI from './api/admin';
export default {
    env: {},
    head: {
        title: "仿wzry官网",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                hid: "description",
                name: "description",
                content: "{{ description }}",
            },
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            //  { rel:"stylesheet",  href:"https://cdn.jsdelivr.net/npm/vditor/dist/index.css"},
        ],
    },
    loading: { color: "#3B8070" },
    css: ["~/assets/css/main.css", "element-ui/lib/theme-chalk/index.css"],
    build: {},
    buildModules: ["@nuxt/typescript-build"],
    modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: MyAdminAPI.adminLoginUrl,
                        method: "post",
                        propertyName: 'token'
                    },
                    logout: { url: MyAdminAPI.adminLogoutUrl, method: "get" },
                    user: { url: MyAdminAPI.currentUserUrl, method: 'get', propertyName: false},
                },
            },
        },
    },
    router: {
        middleware: ['auth']
      },
    plugins: [
        // {src: '@/plugins/axios', ssr: true },
        { src: "@/plugins/element-ui", ssr: false },
        { src: "@/plugins/axios", ssr: true },
        { src: "@/plugins/filter", ssr: true },
        { src: "@/plugins/vue2editor", ssr: false },
    ],
    axios: {},
    server: {
        port: 3001, // default: 3000
        host: "127.0.0.1", // default: localhost,
        timing: false,
    },
};
