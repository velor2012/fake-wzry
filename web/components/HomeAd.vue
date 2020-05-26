<template>
    <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(ad,i) in ads" :key="i">
            <img class="w-100" :src="ad.imgUrl" />
        </swiper-slide>
        <div
            class="swiper-pagination swiper-pagination-home text-right px-3 py-1"
            slot="pagination"
        ></div>
    </swiper>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import { AdItem } from "../types/other";
import MyAdApi from '../api/ad';
import _ from 'lodash';
@Component({
components: {
}
})
export default class extends Vue {
     swiperOptions = {
        pagination: {
            el: ".swiper-pagination-home"
        },
        // Some Swiper option/callback...
        loop: true,
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        }
    };
    ads: AdItem[] = [];

    async mounted() {
        if(_.isEmpty(process.env.AD_ID)) return
        let res = await MyAdApi.findOneAPI(
            this.$axios,
            process.env.AD_ID as string
        );
        if (res.success) {
            this.ads = _.get(res, "data.adItems");
        }
    }
}
</script>