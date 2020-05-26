<template>
    <div>
        <h1>{{ type == "create" ? "创建广告位" : "编辑广告位" }}</h1>
        <el-form
            :model="formdata"
            status-icon
            :rules="rules"
            :ref="formName"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="广告位标题" prop="title">
                <el-input type="input" v-model="formdata.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="广告位内容">
                <el-button @click="addAnAdItem" type="text" icon="el-icon-plus">添加广告</el-button>
                <el-row type="flex" style="flexWrap: wrap">
                    <el-col
                        :span="24"
                        v-for="(item,i) of formdata.adItems"
                        :key="i"
                        class="ad-item"
                    >
                        <el-form-item label="广告链接">
                            <el-input type="input" v-model="item.linkUrl" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="广告图" prop="icon" style="marginTop:1rem">
                            <el-upload
                                class="ad-uploader"
                                :action="baseUrl+imageUploadUrl"
                                :show-file-list="false"
                                :on-success="(res, file, fileList)=>handleImgSuccess(res,item)"
                                :on-error="onError"
                                name="image"
                                :headers="{
                                    Authorization:localStorage
                                }"
                            >
                                <img v-if="item.imgUrl!=''" :src="item.imgUrl" class="ad" />
                                <i v-else class="el-icon-plus ad-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item style="margin:0 0 1rem 7rem">
                            <el-button type="danger" @click="deleteAd(i)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
import { Component, Vue, Watch, NextTick } from "nuxt-property-decorator";
import _ from "lodash";
import MyAdAPI from "~/api/ad";
import { ElForm } from "element-ui/types/form";
import { mypath } from "~/pages/path";
import { AdItem, Ad } from "~/types/other";
import { baseUrl, getToken, onUploadImgSuccess, onUploadImgError } from "~/pages/util";
@Component({
    components: {}
})
export default class MyAdPage extends Vue {
    type:string="create";
    localStorage: string = "";
    baseUrl: string = baseUrl;
    imageUploadUrl: string = MyAdAPI.imageUploadUrl;
    id: string = "";
    formdata: Ad = new Ad();
    formName: string = "ruleForm";
    rules: any = {
        adItems: [
            { required: true, trigger: "blur" },
            { validator: this.validateAdItems, trigger: "blur" }
        ],
        title: [{ required: true, trigger: "blur" }]
    };
    mounted() {
        this.id = _.get(this, "$route.params.id");
        if (!_.isEmpty(this.id)) {
            this.type = 'edit'
            this.getOneAd();
        }
        let _this = this
        this.$nextTick(()=>{
            _this.localStorage = getToken()
        })
    }
    getOneAd() {
        MyAdAPI.findOneAPI(this.$axios, this.id).then(res => {
            if (res.success) {
                this.formdata = res.data;
            }
        });
    }
    validateCategories(rule: any, value: any, callback: any) {
        if (value instanceof Array && value.length == 0) {
            callback(new Error("请选择至少一个分类"));
        } else {
            callback();
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
        MyAdAPI.createAPI(this.$axios, this.formdata).then(res => {
            if (res.success) {
                this.$message({
                    message: "创建成功",
                    type: "success"
                });
                this.$router.push(mypath.adPath.list);
            }
        });
    }

    handleEdit() {
        MyAdAPI.updateAPI(this.$axios, this.id, this.formdata).then(res => {
            if (res.success) {
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.$router.push(mypath.adPath.list);
            }
        });
    }

    resetForm(formName: string) {
        this.formdata = { ...this.formdata, ...new Ad() };
    }
    addAnAdItem() {
        this.formdata.adItems.push(new AdItem());
    }
    validateAdItems(rule: any, value: any, callback: any) {
        if (
            value instanceof Object &&
            !_.isEmpty(value.imgUrl) &&
            !_.isEmpty(value.linkUrl)
        ) {
            callback();
        } else {
            callback(new Error("请填写广告链接以及上传至少一张广告图片"));
        }
    }
    handleImgSuccess(res: any, item: AdItem) {
        onUploadImgSuccess(this,item,'imgUrl',res)
    }
    onError(err:Error, file:File, fileList:File[]){
        onUploadImgError(this,err)
    }
    deleteAd(i) {
        this.formdata.adItems.splice(i, 1);
    }
}
</script>
<style>
.ad-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.ad-uploader .el-upload:hover {
    border-color: #409eff;
}
.ad-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 7rem;
    height: 7rem;
    line-height: 7rem;
    text-align: center;
}
.ad {
    min-width: 7rem;
    height: 7rem;
    display: block;
}
.ad-item {
    border-color: #409eff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    padding: 6px;
    margin-top: 1rem;
}
</style>