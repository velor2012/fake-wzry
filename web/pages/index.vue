<template>
<div>
    <div class=" top-bar bg-black py-1 text-white px-3 d-flex ai-center">
        <img src="../assets/logo.png" height="24">
        <div class="px-1 flex-1">
            <div class="fs-xs text-white">王者荣耀</div>
            <div class="fs-xxs text-grey-1">团队成就更多</div>
        </div>
        <button type="button" class="btn" style="height:1.3846rem">立即下载</button>
    </div>
    <div class="nav nav-inverse bg-primary text-white pt-2 pb-2  jc-around">

        <div>
            <nuxt-link class="fs-xs nav-item" :class="{active:$route.path==='/'}" tag="div" to="/">首页</nuxt-link>
        </div>
        <div>
            <nuxt-link  class="fs-xs nav-item" tag="div" to="/">攻略中心</nuxt-link>
        </div>
        <div>
            <nuxt-link class="fs-xs nav-item" tag="div" to="/">赛事中心</nuxt-link>
        </div>

    </div>
    <nuxt-child/>

</div>
</template>
<script lang="ts">
// <reference path="../assets/variable.scss" />
import {Component,Vue} from "nuxt-property-decorator"
@Component({
components: {
}
})
export default class extends Vue {
}
</script>
<style lang="scss">
.top-bar{
    position: sticky;
    top:0;
    z-index: 999;
}
</style>