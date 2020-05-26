<template>
<div>
<h1>{{ type == "create" ? "创建分类" : "编辑分类" }}</h1>
  <el-form
    :model="formdata"
    status-icon
    :rules="rules"
    :ref="formName"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="父级分类" prop="parent">
      <el-select v-model="formdata.parent" placeholder="请选择父级分类">
        <el-option v-for="(item, i) in parents" :key="i" :label="item.name" :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分类名称" prop="name">
      <el-input type="input" v-model="formdata.name" autocomplete="off"></el-input>
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
import MyCategoryAPI from "~/api/category";
import { ElForm } from "element-ui/types/form";
import { mypath } from "~/pages/path";
import { Category } from "~/types/other";
@Component({
  components: {}
})
export default class MyCategoryPage extends Vue {
  type: string = 'create';
  id: string = "";
  parents: Category[] = [{name:'',_id:'',parent:''}];
  formdata: Category = {name:'',parent:''};
  formName: string = "ruleForm";
  rules: any = 
    {
      parent: [
          { required: true, trigger: "blur" },
          { validator: this.validateParent, trigger: "blur" }
          ],
      name: [{ required: true, trigger: "blur" }]
    }
  ;

  mounted() {
    this.id = _.get(this, "$route.params.id");
    this.getParents()
    if (!_.isEmpty(this.id)) {
        this.getOneCategory()
        this.type = 'edit'
    }
  }
  getParents(){
          MyCategoryAPI.findAllParents(this.$axios).then(res => {
      if (res.success) {
        this.parents = [{ _id: "null", name: "无", parent: null }, ...res.data];
      }
    });
  }
  getOneCategory(){
    MyCategoryAPI.findOneAPI(this.$axios, this.id).then(res => {
        if (res.success) {
          this.formdata = res.data;
        }
      });
  }
    validateParent(rule: any, value: any, callback: any) {
    if (value === "") {
      callback(new Error("请选择父级分类"));
    } else if (value === this.id) {
      callback(new Error("父级分类不能选择自身"));
    } else {
      callback();
    }
  }
  submitForm(formName: string) {
    (this.$refs[formName] as ElForm).validate(valid => {
      if (valid) {
        if (this.formdata.parent === "null") {
            this.formdata.parent = undefined
        }
        this.type === "create" ? this.handleCreate() : this.handleEdit();
      } else {
        // console.log('error submit!!');
        return false;
      }
    });
  }
  handleCreate() {
     MyCategoryAPI.createAPI(this.$axios, this.formdata).then(res=>{
         if(res.success){
                this.$message({
                message: '创建成功',
                type: 'success'
                });
                this.$router.push(mypath.categoryPath.list)
         }
     });
  }

  handleEdit() {
     MyCategoryAPI.updateAPI(this.$axios, this.id,this.formdata).then(res=>{
         if(res.success){
                this.$message({
                message: '修改成功',
                type: 'success'
                });
                this.$router.push(mypath.categoryPath.list)
         }
     });
  }

  resetForm(formName: string) {
        this.formdata = {...this.formdata, ...new Category()}
  }
}
</script>
