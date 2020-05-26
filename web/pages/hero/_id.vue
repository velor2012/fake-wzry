<template>
<div>
    <div class=" top-bar bg-black py-1 text-white px-3 d-flex ai-center">
        <img src="../../assets/logo.png" height="24">
        <div class="px-1 flex-1">
            <strong class="fs-xs text-white px-2">王者荣耀</strong>
            <strong class="fs-xs text-white ">攻略站</strong>
        </div>
        <nuxt-link to="/" tag="div" class=" fs-xs">更多英雄 &gt</nuxt-link>
    </div>
    <!-- start top -->
    <div class="hero-background" :style="`background-image:url(${hero.background})`">
        <div class="info d-flex h-100 flex-column jc-end text-white p-3">
            <div class=" fs-xs">{{hero.title}}</div>
            <h3 class=" my-2">{{hero.name}}</h3>
            <div class="fs-xs">{{categories}}</div>
            <div class="scores fs-sm-1 d-flex ai-center pt-2">
                <div class=" flex-1" v-if="hero.scores">
                    <span>难度</span>
                    <span class="bage bg-primary ">{{hero.scores.difficult}}</span>
                    <span>技能</span>
                    <span class="bage bg-blue-1 ">{{hero.scores.skill}}</span>
                    <span>攻击</span>
                    <span class="bage bg-red-1 ">{{hero.scores.attack}}</span>
                    <span>生存</span>
                    <span class="bage bg-grey ">{{hero.scores.survive}}</span>
                </div>   
                <nuxt-link to='/' class=" fs-sm text-grey">
                    皮肤 &gt;
                </nuxt-link>   
            </div>
        </div>
    </div>
    <!-- end of top -->
    <div>
        <div class="px-3 bg-white">
            <div class="nav d-flex jc-around pt-3 py-2 border-bottom">
                <div class="nav-item active">
                    <div class="nav-link">
                        英雄初识
                    </div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">
                        进阶攻略
                    </div>
                </div>
            </div>
        </div>
            <swiper>
                <swiper-slide>
                    <div>
                        <div class="p-3 bg-white border-bottom">
                            <div class="d-flex">
                                <nuxt-link tag="button" to='/' class="btn-lg text-center flex-1">
                                    <i class="iconfont icon-play p-2"></i>
                                    英雄介绍视频
                                </nuxt-link>
                                <nuxt-link tag="button" to='/' class="btn-lg ml-2 text-center flex-1">
                                    <i class="iconfont icon-picture p-2"></i>
                                    一图识英雄
                                </nuxt-link>
                            </div>

                            <div class="skills mt-4">
                                <div class="d-flex jc-around">
                                    <img
                                    class="icon"
                                    :class="{active:i==currentSkillIndex}"
                                    @click="currentSkillIndex=i"
                                    v-for="(item,i) in hero.skills"
                                    :src="item.icon"
                                    >
                                </div>
                                <div class="mt-4" v-if="currentSkill">
                                    <div class="d-flex">
                                        <h4 style="margin:0">{{currentSkill.name}}</h4>
                                        <span class="text-grey fs-xs ml-4">(冷却值:{{currentSkill.cd}} 消耗:{{currentSkill.cost}})</span>
                                    </div>
                                    <p class=" mt-4 fs-xs">{{currentSkill.description}}</p>
                                    <div v-if="currentSkill.tip&&currentSKill.tip!=''" class="tip">
                                        <div class=" border-bottom"></div>
                                        <div class=" text-grey">小提示: {{currentSKill.tip}}</div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- start recommend items -->
                        <MyCard plain  icon="icon-cc-menu-circle" title="出装推荐" class="hero-items pb-0">
                            <div>顺风出装</div>
                            <div class="d-flex jc-around my-2 border-bottom" v-if="hero.leadingItems">
                                <div
                                v-for="(item,index) in hero.leadingItems"
                                :key="index"
                                class=" text-center"
                                >
                                    <img :src="item.icon" class="icon">
                                    <div class=" fs-xxs">{{item.name}}</div>
                                </div>
                            </div>
                            <div>逆风出装</div>
                            <div class="d-flex jc-around mt-2" v-if="hero.losingItems">
                                <div
                                v-for="(item,index) in hero.losingItems"
                                :key="index"
                                class=" text-center"
                                >
                                    <img :src="item.icon" class="icon">
                                    <div class=" fs-xxs">{{item.name}}</div>
                                </div>
                            </div>
                        </MyCard>
                        <MyCard plain  icon="icon-cc-menu-circle" title="使用技巧">
                            <p class="mt-0 fs-xs">{{hero.usageTip}}</p>
                        </MyCard>
                        <MyCard plain  icon="icon-cc-menu-circle" title="对抗技巧">
                            <p class="mt-0 fs-xs">{{hero.battleTip}}</p>
                        </MyCard>
                        <MyCard plain  icon="icon-cc-menu-circle" title="团战思路">
                            <p class="mt-0 fs-xs">{{hero.teamTip}}</p>
                        </MyCard>
                        <MyCard plain 
                        v-if="hero.partners" 
                        icon="icon-cc-menu-circle" title="英雄关系">
                            <div>最佳搭档</div>
                            <div
                            v-for="(item,index) in hero.partners"
                            :key="index"
                            class="d-flex pt-3"
                            >
                                <img height="42" :src="item.hero.avatar">
                                <p class="mt-0 ml-2 fs-sm-1 flex-1" >{{item.description}}</p>
                            </div>
                            <div class=" mt-3 border-bottom"></div>
                        </MyCard>
                    </div>
                </swiper-slide>
                <swiper-slide></swiper-slide>
            </swiper>
    </div>
</div>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import { Hero } from "~/types/other";
import MyHeroesApi from '../../api/hero';
import _ from 'lodash';
import { scores } from '../../types/other';
import MyCard from '~/components/Card.vue'
@Component({
components: {
    MyCard
}
})
export default class HeroPage extends Vue {
    id!: string;
    hero:Hero = new Hero()
    currentSkillIndex=0
    mounted() {
        this.fetchData()
    }
    async fetchData(){
        this.id = _.get(this, "$route.params.id");
        if(!_.isEmpty(this.id)){
            let res = await MyHeroesApi.findOneAPI(this.$axios,this.id)
            if(res.success){
                this.hero = res.data
            }
        }
    }
    get categories(){
        if(this.hero){
            return  this.hero.categories.map(v=>{
                return _.get(v,'name')
            }).join('/')
        }
    }
    get currentSkill(){
        return this.hero.skills[this.currentSkillIndex]
    }
}
</script>
<style lang="scss">
@import "assets/scss/variable.scss";
.hero-background{
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
}

.info{
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    .scores{
        .bage{
            margin:0 0.25rem;
            display: inline-block;
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            border-radius: 50%;
        }
    }
}
.skills{
    .icon{
        width:4.5rem;
        height:4.5rem;
        border: 3px solid rgba(0,0,0,0);
        border-radius: 45%;
        &.active{
            border: 3px solid map-get($map: $colors, $key: 'primary');
            border-radius: 45%;
        }
    }
}
.hero-items{
    .icon{
        widows: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>