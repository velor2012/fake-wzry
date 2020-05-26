<template>
    <div>
        <h1>管理员列表</h1>
        <el-table v-loading="loading" :data="tableData">
            <el-table-column prop="_id" label="id" width="240" />
            <el-table-column prop="name" label="管理员名称" />
            <el-table-column prop="role" label="角色" />
            <el-table-column prop="githubId" label="githubId"/>
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
import MyAdminAPI from "~/api/admin";
import { Admin } from "../../../types/other";
@Component({
    components: {}
})
export default class extends Vue {
    tableData: Admin[] = [];
    loading = true;

    created() {
        this.getData();
    }

    async getData() {
        let res = await MyAdminAPI.findAllAPI(this.$axios);
        // 如果出现异常res会变成void类型，所以需要用lodash来取值
        if (res.success) {
            this.tableData = res.data;
            this.loading = false;
        }
    }

    clickEdit(data: Admin) {
        this.$router.push(mypath.adminPath.getEditPath(data._id as string));
    }
    clickRemove(id: string) {
        this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(async () => {
                let res = await MyAdminAPI.deleteAPI(this.$axios, id);
                res.success && this.getData();
            })
            .catch(() => {});
    }
}
</script>
