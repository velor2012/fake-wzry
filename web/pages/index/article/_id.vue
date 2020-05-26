<template>
    <div>
        <div class="back-header d-flex p-2 border-bottom" @click="()=>{$router.push('/')}">
            <span class=" text-blue iconfont icon-back"/>
            <strong class=" text-blue flex-1">{{article.title}}</strong>
            <div class=" text-grey fs-xs">{{article.updatedAt | formatDateFull}}</div>
        </div>
        <div class="article-content" v-html="article.content">
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MyArticleApi from "~/api/article"
import _ from "lodash";
import { Article } from '../../../types/other';
@Component({
    components: {}
})
export default class extends Vue {
    id!: string;
    article:Article = new Article()
    async mounted() {
        this.id = _.get(this, "$route.params.id");
        if(this.id){
            let res = await MyArticleApi.findOneAPI(this.$axios,this.id)
            if(res.success){
                this.article = res.data
            }
        }
    }
}
</script>
<style lang="scss">
@import "assets/scss/variable.scss";
.article-content{
    padding: 0 1rem;
    img{
        max-width: 100%;
        height: auto;
    }
    span{
        font-size: 16px;
        line-height: 1.75;
    }
    p{
        font-weight: 1000;
        font-size: 16px;
        line-height: 1.75;
        margin-bottom: 0.70833rem;
    }
    iframe{
        max-width: 100%;
        height: auto;
    }
}
</style>