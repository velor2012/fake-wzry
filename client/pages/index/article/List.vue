<template>
    <div>
        <h1>文章列表</h1>
        <el-table v-loading="loading" :data="tableData">
            <el-table-column prop="_id" label="id" width="240" />
            <el-table-column prop="title" label="文章标题" />
            <el-table-column label="文章分类">
                <template slot-scope="scope">
                    <span style="margin-left: 10px" >{{ scope.row.categories |  formatCategories}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="clickEdit(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click="clickRemove(scope.row._id)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MyArticleAPI from "~/api/article";
import { AxiosResponse, AxiosError } from "axios";
import _ from "lodash";
import { mypath } from "~/pages/path";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { Article, Category } from '../../../types/other';
import MyCategoryAPI from "../../../api/category";
@Component({
    components: {}
})
export default class extends Vue {
    tableData: Article[] = [];
    loading:boolean = true;
    allCategories:Category[] = [];
    categoryId2Name:Map<string,string> = new Map();  
    created() {
        this.getData();
    }

    async getData() {
        let res = await MyArticleAPI.findAllAPI(this.$axios);
        // 如果出现异常res会变成void类型，所以需要用lodash来取值
        if (res.success) {
            this.tableData = res.data;
            this.loading = false;
        }
    }

    async getAllCategories() {
        let res = await MyCategoryAPI.findAllNotHeroCategories(this.$axios);
        this.allCategories = res.data;
        return res
    }

    clickEdit(data: Article) {
        this.$router.push(mypath.articlePath.getEditPath(data._id as string));
    }
    clickRemove(id: string) {
        this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(async () => {
                let res = await MyArticleAPI.deleteAPI(this.$axios, id);
                res.success && this.getData();
            })
            .catch(() => {});
    }
}
</script>
