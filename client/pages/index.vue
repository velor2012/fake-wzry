<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router unique-opened :default-openeds="open_list" :default-active="FullPath">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>内容管理</template
          >
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item :index="path.itemPath.create" 
            >新建物品</el-menu-item>
            <el-menu-item :index="path.itemPath.list" 
            >物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item :index="path.heroPath.create" 
            >新建英雄</el-menu-item>
            <el-menu-item :index="path.heroPath.list" 
            >英雄列表</el-menu-item>
          </el-menu-item-group>
        <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item :index="path.articlePath.create" 
            >新建文章</el-menu-item>
            <el-menu-item :index="path.articlePath.list" 
            >文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-message"></i>运营管理</template
          >
            <el-menu-item-group>
            <template slot="title">广告</template>
            <el-menu-item :index="path.adPath.create" 
            >新建广告位</el-menu-item>
            <el-menu-item :index="path.adPath.list" 
            >广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-message"></i>系统管理</template
          >
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item :index="path.categoryPath.create" 
            >新建分类</el-menu-item>
            <el-menu-item :index="path.categoryPath.list" 
            >分类列表</el-menu-item>
          </el-menu-item-group>
        <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item :index="path.adminPath.create" 
            >新建管理员</el-menu-item>
            <el-menu-item :index="path.adminPath.list" 
            >管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button @click="logout" type="info" size="small" style="marginRight:1rem" >登出 </el-button>
        <span>王小虎</span>
      </el-header>

      <el-main>

        <nuxt-child :key="$route.path"/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, NextTick } from "nuxt-property-decorator";
import { mypath } from './path';
@Component({
  components: {}
})
export default class extends Vue {
  open_list:string[] = ['1'];
  path:MyPath = mypath
  FullPath:String = ''
  @NextTick("setFullPath")
  mounted():void{
    //   this.$nextTick(()=>{
    //       this.FullPath = window.location.href.replace(/http(s)?:\/\/(.*?)\//,'/')
    //   })
  }
  setFullPath(){
      this.FullPath = window.location.href.replace(/http(s)?:\/\/(.*?)\//,'/')
  }
  async logout(){
      let res = await this.$auth.logout();
      this.$router.push(mypath.loginPath)
  }
}
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
