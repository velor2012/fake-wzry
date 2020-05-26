<template>
    <div>
        <h1>物品列表</h1>
        <el-table v-loading="loading" :data="tableData">
            <el-table-column prop="_id" label="id" width="240" />
            <el-table-column prop="name" label="分类名称" />
            <el-table-column prop="icon" label="图标">
                <template slot-scope="scope">
                    <img alt style="height:3rem" :src="scope.row.icon" />
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
import { AxiosResponse, AxiosError } from "axios";
import _ from "lodash";
import { mypath } from "~/pages/path";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import MyItemAPI from "~/api/item";
import { Item } from "../../../types/other";
@Component({
    // 加上下面两行，该页面就不需要访问权限
    // // @ts-ignore
    // auth: false,
    components: {}
})
export default class extends Vue {
    tableData: Item[] = [
        {
            name: "",
            _id: "",
            icon: ""
        }
    ];
    loading = true;

    created() {
        this.getData();
    }

    async getData() {
        let res = await MyItemAPI.findAllAPI(this.$axios);
        // 如果出现异常res会变成void类型，所以需要用lodash来取值
        if (res.success) {
            this.tableData = res.data;
            this.loading = false;
        }
    }

    clickEdit(data: Item) {
        this.$router.push(mypath.itemPath.getEditPath(data._id as string));
    }
    clickRemove(id: string) {
        this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(async () => {
                let res = await MyItemAPI.deleteAPI(this.$axios, id);
                res.success && this.getData();
            })
            .catch(() => {});
    }
}
</script>
