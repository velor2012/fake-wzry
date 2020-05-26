<template>
    <div>
        <h1>{{ type == "create" ? "新建管理员" : "编辑管理员" }}</h1>
        <el-form
            :model="formdata"
            status-icon
            :rules="rules"
            :ref="formName"
            label-width="150px"
            class="demo-ruleForm"
        >
            <el-form-item label="管理员名称" prop="name">
                <el-input type="input" v-model="formdata.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="formdata.role" placeholder="请选择角色">
                    <el-option
                        v-for="(item, i) in roles"
                        :key="i"
                        :label="item"
                        :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-show="!showChangePasswordButton && type!=='create'"
                @click.native="showChangePasswordButton = true"
                label="管理员密码"
                prop="password"
            >
                <el-button type="text">修改密码</el-button>
            </el-form-item>
            <el-form-item
                v-show="showChangePasswordButton || type=='create'"
                label="管理员密码"
                prop="password"
            >
                <el-input type="password" v-model="formdata.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                v-show="showChangePasswordButton || type=='create'"
                label="再次确认密码"
                prop="confimPasswordField"
            >
                <el-input type="password" v-model="formdata.confimPasswordField" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Github Id" prop="githubId">
                <el-input type="input" v-model="formdata.githubId" autocomplete="off"></el-input>
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
import MyAdminAPI from "~/api/admin";
import { mypath } from "~/pages/path";
import { baseUrl } from "~/pages/util";
import { Admin, roles } from '~/types/other';
@Component({
    components: {}
})
export default class MyAdminPage extends Vue {
    type:string="create";
    avatarUploadUrl: string = MyAdminAPI.avatarUploadUrl;
    baseUrl: string = baseUrl;

    showChangePasswordButton: boolean = false;
    id: string = "";
    formdata: Admin = new Admin()
    roles:string[] = roles
    formName: string = "ruleForm";
    rules: any = {
        password: [
            { required: false, trigger: "blur" }
        ],
        name: [{ required: true, trigger: "blur" }],
        confimPasswordField: [
            {
                required: false,
                validator: this.validatePass2,
                trigger: "blur"
            }
        ]
    };
    validatePass2(rule: any, value: any, callback: any) {
        if (!this.showChangePasswordButton) {
            callback();
        }
        if (value === "") {
            callback(new Error("请再次输入密码"));
        } else if (value !== this.formdata.password) {
            callback(new Error("两次输入密码不一致!"));
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
                return false;
            }
        });
    }
    handleCreate() {
        MyAdminAPI.createAPI(this.$axios, this.formdata).then(res => {
            if (res.success) {
                this.$message({
                    message: "创建成功",
                    type: "success"
                });
                this.$router.push(mypath.adminPath.list);
            }
        });
    }

    handleEdit() {
        MyAdminAPI.updateAPI(this.$axios, this.id, this.formdata).then(res => {
            if (res.success) {
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.$router.push(mypath.adminPath.list);
            }
        });
    }
    resetForm(formName: string) {
        this.formdata = { ...this.formdata, ...new Admin() };
    }
    mounted() {
        this.id = _.get(this, "$route.params.id");
        if (!_.isEmpty(this.id)) {
            this.showChangePasswordButton=false
            this.type = 'edit'
            MyAdminAPI.findOneAPI(this.$axios, this.id).then(res => {
                if (res.success) {
                    this.formdata = res.data;
                }
            });
        }else{ this.showChangePasswordButton=true}
    }
    @Watch("showChangePasswordButton")
    change(newValue:boolean){
        this.rules.password.forEach(element => {
            element.required = newValue
        });
        this.rules.confimPasswordField.forEach(element => {
            element.required = newValue
        });
    }
}
</script>
<style>
</style>
