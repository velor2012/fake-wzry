import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _219b43f4 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _555c281b = () => interopDefault(import('../pages/path.ts' /* webpackChunkName: "pages/path" */))
const _7dae331e = () => interopDefault(import('../pages/util.ts' /* webpackChunkName: "pages/util" */))
const _57f3a0dd = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _75c1bd39 = () => interopDefault(import('../pages/index/ad/create/index.vue' /* webpackChunkName: "pages/index/ad/create/index" */))
const _1f04ca78 = () => interopDefault(import('../pages/index/ad/List.vue' /* webpackChunkName: "pages/index/ad/List" */))
const _6bf4bf3e = () => interopDefault(import('../pages/index/admin/create/index.vue' /* webpackChunkName: "pages/index/admin/create/index" */))
const _855b54c0 = () => interopDefault(import('../pages/index/admin/List.vue' /* webpackChunkName: "pages/index/admin/List" */))
const _3d8b7f1a = () => interopDefault(import('../pages/index/article/create/index.vue' /* webpackChunkName: "pages/index/article/create/index" */))
const _e20a054e = () => interopDefault(import('../pages/index/article/List.vue' /* webpackChunkName: "pages/index/article/List" */))
const _0fc74584 = () => interopDefault(import('../pages/index/category/create/index.vue' /* webpackChunkName: "pages/index/category/create/index" */))
const _63638106 = () => interopDefault(import('../pages/index/category/List.vue' /* webpackChunkName: "pages/index/category/List" */))
const _3c69a67c = () => interopDefault(import('../pages/index/hero/create/index.vue' /* webpackChunkName: "pages/index/hero/create/index" */))
const _20f6d301 = () => interopDefault(import('../pages/index/hero/List.vue' /* webpackChunkName: "pages/index/hero/List" */))
const _f3d6126e = () => interopDefault(import('../pages/index/item/create/index.vue' /* webpackChunkName: "pages/index/item/create/index" */))
const _0ab29408 = () => interopDefault(import('../pages/index/item/List.vue' /* webpackChunkName: "pages/index/item/List" */))
const _01ee596f = () => interopDefault(import('../pages/index/ad/edit/_id.vue' /* webpackChunkName: "pages/index/ad/edit/_id" */))
const _5ab21097 = () => interopDefault(import('../pages/index/admin/edit/_id.vue' /* webpackChunkName: "pages/index/admin/edit/_id" */))
const _53de33d0 = () => interopDefault(import('../pages/index/article/edit/_id.vue' /* webpackChunkName: "pages/index/article/edit/_id" */))
const _55bbc3f4 = () => interopDefault(import('../pages/index/category/edit/_id.vue' /* webpackChunkName: "pages/index/category/edit/_id" */))
const _3326f578 = () => interopDefault(import('../pages/index/hero/edit/_id.vue' /* webpackChunkName: "pages/index/hero/edit/_id" */))
const _677cdaff = () => interopDefault(import('../pages/index/item/edit/_id.vue' /* webpackChunkName: "pages/index/item/edit/_id" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _219b43f4,
    name: "login"
  }, {
    path: "/path",
    component: _555c281b,
    name: "path"
  }, {
    path: "/util",
    component: _7dae331e,
    name: "util"
  }, {
    path: "/",
    component: _57f3a0dd,
    name: "index",
    children: [{
      path: "ad/create",
      component: _75c1bd39,
      name: "index-ad-create"
    }, {
      path: "ad/List",
      component: _1f04ca78,
      name: "index-ad-List"
    }, {
      path: "admin/create",
      component: _6bf4bf3e,
      name: "index-admin-create"
    }, {
      path: "admin/List",
      component: _855b54c0,
      name: "index-admin-List"
    }, {
      path: "article/create",
      component: _3d8b7f1a,
      name: "index-article-create"
    }, {
      path: "article/List",
      component: _e20a054e,
      name: "index-article-List"
    }, {
      path: "category/create",
      component: _0fc74584,
      name: "index-category-create"
    }, {
      path: "category/List",
      component: _63638106,
      name: "index-category-List"
    }, {
      path: "hero/create",
      component: _3c69a67c,
      name: "index-hero-create"
    }, {
      path: "hero/List",
      component: _20f6d301,
      name: "index-hero-List"
    }, {
      path: "item/create",
      component: _f3d6126e,
      name: "index-item-create"
    }, {
      path: "item/List",
      component: _0ab29408,
      name: "index-item-List"
    }, {
      path: "ad/edit/:id?",
      component: _01ee596f,
      name: "index-ad-edit-id"
    }, {
      path: "admin/edit/:id?",
      component: _5ab21097,
      name: "index-admin-edit-id"
    }, {
      path: "article/edit/:id?",
      component: _53de33d0,
      name: "index-article-edit-id"
    }, {
      path: "category/edit/:id?",
      component: _55bbc3f4,
      name: "index-category-edit-id"
    }, {
      path: "hero/edit/:id?",
      component: _3326f578,
      name: "index-hero-edit-id"
    }, {
      path: "item/edit/:id?",
      component: _677cdaff,
      name: "index-item-edit-id"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
