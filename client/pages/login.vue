<template>
<div>
    <el-card header="登录" class = "login-card">
        <el-form 
        :model="user"
        @submit.native.prevent="login"
        ref="loginForm"
        >
            <el-form-item label="用户名" prop="name">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item style="textAlign:center">
                <el-row type="flex" justify="space-around">
                    <el-button native-type="submit" type="primary">登录</el-button>
                    <el-button @click="loginGithub" type="primary">github登录</el-button>
                </el-row>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import MyAdminApi from '../api/admin';
import { ElForm } from "element-ui/types/form";
import { mypath } from "./path";
import _ from 'lodash'
import { baseUrl } from "./util";
@Component({
components: {
}
})
export default class extends Vue {
    user:any = {}
    rules: any = {
        name: [{ required: true, trigger: "blur" },],
        password: [{ required: true, trigger: "blur" }]
    };
    login(){
        (this.$refs.loginForm as ElForm).validate(async valid => {
            if (valid) {
                // let res =  await MyAdminApi.loginAPI(this.$axios,this.user)           
                // if(res.success){
                //     this.$router.push(mypath.categoryPath.list)
                // }else{
                //     console.log(res.data)
                // }
                
                try {
                    let res = await this.$auth.loginWith('local', { data: this.user })
                    console.log(res)
                } catch (err) {
                    console.log(err)
                }
            } else {
                return false;
            }
        });
    }
    //github登录
    async loginGithub(){
        window.location.href=baseUrl+MyAdminApi.githubLoginUrl
    }
    async mounted(){
        //github登录，接收跳转回来的参数
        let id = _.get(this,'$route.query.id')
        let accessToken = _.get(this,'$route.query.accessToken')
        if(id && accessToken){
            this.user.name= 'github'+id
            this.user.password=accessToken
            let res = await this.$auth.loginWith('local', { data: this.user })
        }
    }
    //end github登录
}
</script>
<style>
.login-card{
    width: 30vw;
    margin: 30vh auto;
}
</style>