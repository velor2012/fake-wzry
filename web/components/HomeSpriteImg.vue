<template>
<!-- start sprite-nav-icon -->
        <div class="sprite-nav-home my-2">
            <div 
            :class="navIconsClass">

                <div
                    class="text-center nav-item my-3 text-grey fs-sm"
                    v-for="(item,i) in spriteImages"
                    :key="i"
                >
                    <i :class="`sprite ${item.class}`"></i>
                    <div class="nav-item-text">{{item.text}}</div>
                </div>
            </div>
            <div id="openArrow" @click="open" class="bg-light text-center fs-sm py-2">
                <i :class="arrowClass"></i>
                {{isOpen?"收起":"展开"}} 
            </div>
        </div>
         <!-- end sprite-nav-icon -->
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
@Component({
components: {
}
})
export default class extends Vue {
    isOpen:boolean = false
   
    spriteImages: any[] = [
        { class: "sprite-news", text: "爆料站" },
        { class: "sprite-stories", text: "故事站" },
        { class: "sprite-store", text: "周边商城" },
        { class: "sprite-trial", text: "体验服" },
        { class: "sprite-rookie", text: "新手专区" },
        { class: "sprite-honor", text: "荣耀传承" },
        { class: "sprite-analogy", text: "模拟战资料库" },
        { class: "sprite-king", text: "王者营地" },
        { class: "sprite-official-account", text: "公众号" },
        { class: "sprite-version-introduction", text: "版本介绍" },
        { class: "sprite-enviroment", text: "对局环境" },
        { class: "sprite-infinity-kings", text: "无限王者团" },
        { class: "sprite-ideas", text: "创意互动营" }
    ];
    open(){
        this.isOpen = !this.isOpen
        // this.$nextTick(()=>{
        //     let el = document.getElementById('openArrow')
        //     if(el instanceof HTMLElement){
        //         el.classList.add('open')
        //     }
        // })
    }

    get navIconsClass(){
        let myClass = 'nav-icons bg-white d-flex flex-wrap';
        return !this.isOpen?myClass:myClass+' open'
    }
    get arrowClass(){
        let myClass = 'sprite sprite-arrow'
        return !this.isOpen?myClass:myClass+' open'
    }
}
</script>
<style lang="scss">
@import "assets/scss/variable.scss";
.swiper-pagination-home {
    .swiper-pagination-bullet {
        border-radius: 0.1538rem;
        background-color: white;
        opacity: 1;
        &.swiper-pagination-bullet-active {
            background-color: map-get($map: $colors, $key: "info");
        }
    }
}
.nav-icons {
    //处理展开收起的样式
    overflow: hidden;
    max-height: 6.1538rem;
    transition: max-height .5s;
    &.open{
        max-height: 100vh;
    }
    //end 处理展开收起的样式

    .nav-item {
        width: 25%;
        border-right: solid 1px map-get($map: $colors, $key: "grey-2");
        &:nth-child(4n) {
            border-left: none;
        }
    }
}

.sprite-nav-home{
    border-bottom: 1px solid map-get($map: $colors, $key: "grey-2");
    border-top: 1px solid map-get($map: $colors, $key: "grey-2");
}
.sprite-arrow.open{
    animation:rotate 0.25s linear forwards;
}
@keyframes rotate{
      0%{transform:rotate(0deg);}
      100%{transform:rotate(180deg);}
    }
</style>