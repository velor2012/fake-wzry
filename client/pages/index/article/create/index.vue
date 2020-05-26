<template>
<div>
<h1>{{ type == "create" ? "创建文章" : "编辑文章" }}</h1>
  <el-form
    :model="formdata"
    status-icon
    :rules="rules"
    :ref="formName"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="父级文章" prop="categories">
      <el-select v-model="formdata.categories" multiple placeholder="请选择文章分类">
        <el-option v-for="(item, i) in categoryOptons" :key="i" :label="item.name" :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章标题" prop="title">
      <el-input type="input" v-model="formdata.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
          <client-only>
        <vue-editor useCustomImageHandler
        @image-added="handleImageAdded"
        v-model="formdata.content"></vue-editor>
        </client-only>
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
import MyArticleAPI from "~/api/article";
import { ElForm } from "element-ui/types/form";
import { mypath } from "~/pages/path";
import { Article, Category } from "~/types/other";
import MyCategoryAPI from "~/api/category";
import { baseUrl, onUploadImgSuccess, getUploadImgUrl } from "~/pages/util";
@Component({
  components: {
  }
})
export default class MyArticlePage extends Vue {
type:string="create";
baseUrl: string = baseUrl;
  id: string = "";
  parents: Article[] = [new Article()];
  formdata: Article = new Article();
  formName: string = "ruleForm";
  categoryOptons: Category[] = []
  rules: any = 
    {
      categories: [
          { required: true, trigger: "blur" },
          { validator: this.validateCategories, trigger: "blur" }
          ],
      title: [{ required: true, trigger: "blur" }]
    }
  ;
  mounted() {
    this.id = _.get(this, "$route.params.id");
    this.getAllCategories()
    if (!_.isEmpty(this.id)) {
        this.type = 'edit';
        this.getOneArticle()
    }
  }

  getOneArticle(){
    MyArticleAPI.findOneAPI(this.$axios, this.id).then(res => {
        if (res.success) {
          this.formdata = res.data;
        }
      });
  }
    validateCategories(rule: any, value: any, callback: any) {
    if (value instanceof Array && value.length == 0 ) {
      callback(new Error("请选择至少一个分类"));
    } else {
      callback();
    }
  }
async getAllCategories() {
    let res = await MyCategoryAPI.findAllNotHeroCategories(this.$axios);
    this.categoryOptons = res.data;
}
  submitForm(formName: string) {
    (this.$refs[formName] as ElForm).validate(valid => {
      if (valid) {
        this.type === "create" ? this.handleCreate() : this.handleEdit();
      } else {
        // console.log('error submit!!');
        return false;
      }
    });
  }
  handleCreate() {
     MyArticleAPI.createAPI(this.$axios, this.formdata).then(res=>{
         if(res.success){
                this.$message({
                message: '创建成功',
                type: 'success'
                });
                this.$router.push(mypath.articlePath.list)
         }
     });
  }

  handleEdit() {
     MyArticleAPI.updateAPI(this.$axios, this.id,this.formdata).then(res=>{
         if(res.success){
                this.$message({
                message: '修改成功',
                type: 'success'
                });
                this.$router.push(mypath.articlePath.list)
         }
     });
  }

  resetForm(formName: string) {
    this.formdata = {...this.formdata, ...new Article()}
  }
  handleImageAdded(file:File, Editor:any, cursorLocation:any, resetUploader:any) {
        MyArticleAPI.uploadImg(this.$axios,file).then(res=>{
         if(res.success){
                let url = getUploadImgUrl(res.data,baseUrl)
                // Get url from response
                Editor.insertEmbed(cursorLocation, "image", url);
                resetUploader();
         }})
  }
}
</script>
