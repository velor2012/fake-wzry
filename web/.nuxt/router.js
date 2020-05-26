import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _460a5672 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _5002be85 = () => interopDefault(import('../pages/hero/_id.vue' /* webpackChunkName: "pages/hero/_id" */))
const _d7d399bc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _b8774fb6 = () => interopDefault(import('../pages/index/index.vue' /* webpackChunkName: "pages/index/index" */))
const _784428b4 = () => interopDefault(import('../pages/index/article/_id.vue' /* webpackChunkName: "pages/index/article/_id" */))

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
    path: "/test",
    component: _460a5672,
    name: "test"
  }, {
    path: "/hero/:id?",
    component: _5002be85,
    name: "hero-id"
  }, {
    path: "/",
    component: _d7d399bc,
    children: [{
      path: "",
      component: _b8774fb6,
      name: "index"
    }, {
      path: "article/:id?",
      component: _784428b4,
      name: "index-article-id"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
