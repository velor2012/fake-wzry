<template>
<card :title="myListCard.title" :icon="myListCard.icon">
                <div class="nav jc-between">
                    <div
                    v-for="(item,index) in myListCard.categories"
                    class = 'nav-item'
                    :class="{active:index === activeIndex}"
                    @click="$refs.mySwiper2.$swiper.slideTo(index+1)"
                    >
                        <div class="nav-lint">{{item.name}}</div>
                    </div>
                </div>
                <!-- <client-only> -->
                <swiper ref="mySwiper2" @slide-change="()=> activeIndex = $refs.mySwiper2.$swiper.realIndex" class="mt-2" :options="swiperOptions2">
                    <swiper-slide v-for="(item,index) in myListCard.categories" :key="index">
                        <slot name="swiper-content" :listItems="item.listItems"></slot>
                    </swiper-slide>
                </swiper>
                <!-- </client-only> -->
        </card>
</template>
<script lang="ts">
import {Component,Vue, Prop} from "nuxt-property-decorator"
import { ListCard } from '../types/ListCard';
@Component({
components: {
}
})
export default class MyListCard extends Vue {
    @Prop({ type: ListCard, required: true }) readonly myListCard: ListCard | undefined;
    activeIndex = 0;
    swiperOptions2 = {
        // Some Swiper option/callback...
        loop: true,
        // on: {
        //     slideChangeTransitionEnd: this.changeActiveIndex
        // },
        autoHeight:true,
    };
    // changeActiveIndex(){
    //     let mySiwper2:any = this.$refs.mySwiper2
    //     if(mySiwper2.$swiper){
    //      this.activeIndex = mySiwper2.$swiper.activeIndex
    //     }
    // }
    // onListHeaderClick(index:number){
    //     console.log(index);
    //     (this.$refs.mySwiper2 as any).$swiper.slideTo(index+1)
    // }
}
</script>
  