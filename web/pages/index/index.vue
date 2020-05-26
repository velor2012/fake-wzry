<template>
    <div>
        <home-ad/>
        
        <HomeSpriteImg/>

        <news/>

        <hero-list/>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import MyAdApi from "../../api/ad";
import { AdItem } from "../../types/other";
import _ from "lodash";
import News from "~/components/News.vue"
import HeroList from "~/components/HeroesList.vue"
import HomeAd from "~/components/HomeAd.vue"
import HomeSpriteImg from "~/components/HomeSpriteImg.vue"
@Component({
    components: {
        News,
        HomeAd,
        HomeSpriteImg,
        HeroList
    }
})
export default class extends Vue {
    
}
</script>