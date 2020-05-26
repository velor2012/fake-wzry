<template>
    <div class="card bg-white p-3 mt-3">
        <div class="card-header" :class="{'border-bottom':!plain}">
            <div class=" news-header pb-2 d-flex ai-center">
                <span class="fs-sm iconfont" :class="icon"></span>
                <div class=" flex-grow-1 px-2"><strong>{{title}}</strong></div>
                <span v-if="!plain" class="iconfont icon-dot"></span>
            </div>
            <div>
                <slot name="header"></slot>
            </div>
        </div>
        <div class="card-body pt-2">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
@Component({
    components: {}
})
export default class Card extends Vue {
    @Prop({ type: String, required: true }) readonly title: String | undefined;
    @Prop({ type: String, required: true }) readonly icon: String | undefined;
    @Prop({ type: Boolean, required: false,default:false }) readonly plain: Boolean | undefined;
}
</script>
<style lang="scss">
@import "assets/scss/variable.scss";
</style>