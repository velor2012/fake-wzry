<template>
    <div>
        <h1>{{ type == "create" ? "新建物品" : "编辑物品" }}</h1>
        <el-form
            :model="formdata"
            status-icon
            :rules="rules"
            :ref="formName"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="物品名称" prop="name">
                <el-input type="input" v-model="formdata.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
                <el-upload
                    class="avatar-uploader"
                    :action="baseUrl+iconUploadUrl"
                    :data="testdata"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="onError"
                    :headers="{
                        Authorization:localStorage
                    }"
                >
                    <img v-if="formdata.icon!=''" :src="formdata.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formName)">
                    {{
                    type == "create" ? "创建" : "保存"
                    }}
                </el-button>
                <el-button @click="resetForm(`${formName}`)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import _ from "lodash";
import { ElForm } from "element-ui/types/form";
import MyItemAPI from "~/api/item";
import { mypath } from "~/pages/path";
import { baseUrl, getToken, onUploadImgError, onUploadImgSuccess } from "~/pages/util";
import { Item } from "~/types/other";
@Component({
    components: {}
})
export default class MyItemPage extends Vue {
    type:string="create";
    iconUploadUrl: string = MyItemAPI.iconUploadUrl;
    baseUrl: string = baseUrl;
    localStorage:string = ''

    id: string = "";
    parents: Item[] = [{ name: "", _id: "", icon: "" }];
    formdata: Item = { name: "", icon: "" };
    formName: string = "ruleForm";
    rules: any = {
        icon: [{ required: true, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }]
    };
    testdata: any = {
        test: "fuck you"
    };
    mounted(){
        let _this = this
        this.$nextTick(()=>{
            _this.localStorage = getToken()
        })
        this.id = _.get(this, "$route.params.id");
        if (!_.isEmpty(this.id)) {
            this.type = 'edit'
            MyItemAPI.findOneAPI(this.$axios, this.id).then(res => {
                if (res.success) {
                    this.formdata = res.data;
                }
            });
        }
    }
    submitForm(formName: string) {
        (this.$refs[formName] as ElForm).validate(valid => {
            if (valid) {
                this.type === "create"
                    ? this.handleCreate()
                    : this.handleEdit();
            } else {
                // console.log('error submit!!');
                return false;
            }
        });
    }
    handleCreate() {
        MyItemAPI.createAPI(this.$axios, this.formdata).then(res => {
            if (res.success) {
                this.$message({
                    message: "创建成功",
                    type: "success"
                });
                this.$router.push(mypath.itemPath.list);
            }
        });
    }

    handleEdit() {
        MyItemAPI.updateAPI(this.$axios, this.id, this.formdata).then(res => {
            if (res.success) {
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.$router.push(mypath.itemPath.list);
            }
        });
    }
    handleAvatarSuccess(res: any, file: File) {
        onUploadImgSuccess(this,this.formdata,'icon',res)
    }
    onError(err:Error, file:File, fileList:File[]){
        onUploadImgError(this,err)
    }
    resetForm(formName: string) {
        this.formdata = {...this.formdata, ...new Item()}
    }
}
</script>
<style>
</style>
