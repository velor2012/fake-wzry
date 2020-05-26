<template>
<MyListCard :myListCard="myListCard">
    <template #swiper-content="{listItems}">
        <nuxt-link tag="a" :to="`/article/${item2._id}`" class="py-2 d-flex fs-sm text-dark" v-for="(item2,index) in listItems" :key=index>
            <span class="text-info">[{{item2.categoryName}}]</span>
            <span class=" px-1">|</span>
            <span class="flex-1 text-ellipsis pr-2">{{item2.title}}</span>
            <span class="time text-grey-1">{{item2.updatedAt | formatDateMD}}</span>
        </nuxt-link>
    </template>
</MyListCard>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import MyListCard from "~/components/ListCard.vue"
import { ListCard, ListCardCategory } from '../types/ListCard';
import { Article, NewsListItem } from '../types/other';
import MyNewsApi from '../api/news';
import { formatDateMD } from '../plugins/filter';
@Component({
components: {
    MyListCard
}
})
export default class News extends Vue {
    myCategories:any
    myListCard = new ListCard('','',[])

    async mounted(){
        // console.log('in')
        let res = await MyNewsApi.findAllAPI(this.$axios,5)
        if(res.success){
            this.myCategories = res.data
                // console.log(this.myCategories)
            this.myListCard=new ListCard('新闻资讯','icon-cc-menu-circle',this.myCategories)
        }
    }
}
</script>
