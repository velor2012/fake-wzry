<template>
<MyListCard :myListCard="myListCard">
    <template #swiper-content="{listItems}">
        <div class="d-flex flex-wrap " style="margin:0 -0.5rem">
            <nuxt-link :to="`/hero/${item2._id}`" class="p-2 text-center" style="width:20%" v-for="(item2,index) in listItems" :key=index>
                <img :src="item2.avatar" class=" w-100" />
                <div class=" fs-sm-1">{{item2.name}}</div>
            </nuxt-link>
        </div>
    </template>
</MyListCard>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import MyListCard from "~/components/ListCard.vue"
import { ListCard, ListCardCategory } from '../types/ListCard';
import { Article, NewsListItem } from '../types/other';
import MyHeroesApi from '../api/hero';
@Component({
components: {
    MyListCard
}
})
export default class HeroList extends Vue {
    myCategories:any
    myListCard = new ListCard('','',[])

    mounted(){
        // console.log('in')
        this.getData()
    }
    getData(){
        let res = MyHeroesApi.findAllAPI(this.$axios).then(res=>{
            if(res.success){
                this.myCategories = res.data
                // console.log(this.myCategories)
                this.myListCard=new ListCard('英雄列表','icon-Boxing-Helmet',this.myCategories)
            }
        }) 
    }
}
</script>
