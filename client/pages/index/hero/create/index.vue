<template>
    <div>
        <h1>{{ type == "create" ? "新建英雄" : "编辑英雄" }}</h1>
        <el-form
            :model="formdata"
            status-icon
            :rules="rules"
            :ref="formName"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-tabs value="basic" type="border-card">
                <el-tab-pane label="基本信息" name="basic"> 
                    <el-form-item label="英雄名称" prop="name">
                        <el-input type="input" v-model="formdata.name" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="英雄称号" prop="title">
                        <el-input type="input" v-model="formdata.title" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="头像" prop="avatar">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + uploadAvatarUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :headers="{
                                Authorization:localStorage
                            }"
                            :on-error="onError"
                        >
                            <img
                                v-if="formdata.avatar != '' && formdata.avatar!=undefined"
                                :src="formdata.avatar"
                                class="avatar"
                            />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="背景图" prop="background">
                        <el-upload
                            class="background-uploader"
                            :action="baseUrl + uploadAvatarUrl"
                            :show-file-list="false"
                            :on-success="handleBackgroundSuccess"
                            :headers="{
                                Authorization:localStorage
                            }"
                            :on-error="onError"
                        >
                            <img
                                v-if="formdata.background != '' && formdata.background!=undefined"
                                :src="formdata.background"
                                class="background"
                            />
                            <i v-else class="el-icon-plus background-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="英雄类型" prop="categories">
                        <el-select multiple v-model="formdata.categories">
                            <el-option
                                v-for="(item, i) in categoryOptons"
                                :key="i"
                                :label="item.name"
                                :value="item._id"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="操作难度" prop="difficult">
                        <el-rate
                            :max="9"
                            show-score
                            style="padding-top:0.6rem"
                            type="input"
                            v-model="formdata.scores.difficult"
                            autocomplete="off"
                            placeholder="请输入操作难度"
                        />
                    </el-form-item>
                    <el-form-item label="技能强度" prop="skill">
                        <el-rate
                            :max="9"
                            show-score
                            style="padding-top:0.6rem"
                            v-model="formdata.scores.skill"
                        />
                    </el-form-item>

                    <el-form-item label="攻击能力" prop="attack">
                        <el-rate
                            :max="9"
                            show-score
                            style="padding-top:0.6rem"
                            v-model="formdata.scores.attack"
                        />
                    </el-form-item>

                    <el-form-item label="生存能力" prop="survive">
                        <el-rate
                            :max="9"
                            show-score
                            style="padding-top:0.6rem"
                            v-model="formdata.scores.survive"
                        />
                    </el-form-item>

                    <el-form-item label="顺风出装" prop="leadingItems">
                        <el-select filterable multiple :multiple-limit="6" v-model="formdata.leadingItems">
                            <el-option
                                v-for="(item, i) in items"
                                :key="i"
                                :label="item.name"
                                :value="item._id"
                                style="height:4rem"
                            >
                                <el-row type="flex" justify="space-between" align="middle">
                                    <el-image
                                        alt
                                        fit="contain"
                                        style="marginTop:5px;marginBottom:5px;width:3rem;height:3rem;"
                                        :src="item.icon"
                                    />
                                    <span style="color: #8492a6; font-size: 13px">{{ item.name }}</span>
                                </el-row>
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="逆风出装" prop="losingItems">
                        <el-select filterable multiple :multiple-limit="6" v-model="formdata.losingItems">
                            <el-option
                                v-for="(item, i) in items"
                                :key="i"
                                :label="item.name"
                                :value="item._id"
                                style="height:4rem"
                            >
                                <el-row type="flex" justify="space-between" align="middle">
                                    <el-image
                                        alt
                                        fit="contain"
                                        style="marginTop:5px;marginBottom:5px;width:3rem;height:3rem;"
                                        :src="item.icon"
                                    />
                                    <span style="color: #8492a6; font-size: 13px">{{ item.name }}</span>
                                </el-row>
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="使用技巧" prop="usageTip">
                        <el-input type="textarea" v-model="formdata.usageTip" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="对抗技巧" prop="battleTip">
                        <el-input type="textarea" v-model="formdata.battleTip" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="团战思路" prop="teamTip">
                        <el-input type="textarea" v-model="formdata.teamTip" autocomplete="off"></el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="技能" name="skills">
                    <el-button
                        type="text"
                        @click="formdata.skills.length<maxSkillNumber&&formdata.skills.push({})"
                        icon="el-icon-plus"
                    >添加技能</el-button>
                    <el-row type="flex" style="flexWrap: wrap">
                        <el-col
                            :span="12"
                            v-for="(item,i) in formdata.skills"
                            :key="i"
                            class="skill-item"
                        >
                            <el-form-item label="名称" prop="skills" :prop="`skills[${i}].name`">
                                <el-input
                                    type="input"
                                    v-model="item.name"
                                    autocomplete="off"
                                    name="skillName"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="图标" :prop="`skills[${i}].icon`">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="baseUrl+uploadSkillIconUrl"
                                    :show-file-list="false"
                                    :on-success="(res, file, fileList)=>handleIconSuccess(res,item)"
                                    :headers="{
                                        Authorization:localStorage
                                    }"
                                    :on-error="onError"
                                >
                                    <img
                                        v-if="item.icon!=''&&item.icon!=undefined"
                                        :src="item.icon"
                                        class="avatar"
                                    />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>

                            <el-form-item label="冷却时间" prop="cd" :prop="`skills[${i}].cd`">
                                <el-input
                                    type="input"
                                    v-model="item.cd"
                                    autocomplete="off"
                                    name="cd"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="消耗" prop="cost" :prop="`skills[${i}].cost`">
                                <el-input
                                    type="input"
                                    v-model="item.cost"
                                    autocomplete="off"
                                    name="cost"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="描述" :prop="`skills[${i}].description`">
                                <el-input
                                    type="textarea"
                                    v-model="item.description"
                                    autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="小技巧" :prop="`skills[${i}].tip`">
                                <el-input type="textarea" v-model="item.tip" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" @click="deleteSkill(i)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label="最佳搭档" name="partners">
                    <el-button
                        type="text"
                        @click="formdata.partners.length<maxPartnerNumber&&formdata.partners.push({})"
                        icon="el-icon-plus"
                    >添加搭档</el-button>
                    <el-row type="flex" style="flexWrap: wrap">
                        <el-col
                            :span="12"
                            v-for="(item,i) in formdata.partners"
                            :key="i"
                            class="skill-item"
                        >
                            <el-form-item label="英雄" prop="partners" :prop="`partners[${i}].hero`">
                                <el-select  filterable v-model="item.hero">
                                        <el-option
                                            v-for="(item, i) in heroes"
                                            :key="i"
                                            :label="item.name"
                                            :value="item._id"
                                            style="height:4rem"
                                        >
                                            <el-row type="flex" justify="space-between" align="middle">
                                                <el-image
                                                    alt
                                                    fit="contain"
                                                    style="marginTop:5px;marginBottom:5px;width:3rem;height:3rem;"
                                                    :src="item.avatar"
                                                />
                                                <span style="color: #8492a6; font-size: 13px">{{ item.name }}</span>
                                            </el-row>
                                        </el-option>
                                    </el-select>
                            </el-form-item>

                            <el-form-item label="描述" :prop="`partners[${i}].description`">
                                <el-input
                                    type="textarea"
                                    v-model="item.description"
                                    autocomplete="off"
                                ></el-input>
                            </el-form-item>

                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="marginTop:1rem">
                <el-button
                    type="primary"
                    @click="submitForm(formName)"
                >{{ type == "create" ? "创建" : "保存" }}</el-button>
                <el-button @click="resetForm(`${formName}`)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, NextTick } from "nuxt-property-decorator";
import _ from "lodash";
import { ElForm } from "element-ui/types/form";
import { mypath } from "~/pages/path";
import { baseUrl, getToken, onUploadImgSuccess, onUploadImgError } from "~/pages/util";
import MyHeroAPI from "~/api/hero";
import { Hero, Category, Item, skill, scores } from '~/types/other';
import MyCategoryAPI from "~/api/category";
import MyItemAPI from "~/api/item";
@Component({
    components: {}
})
export default class MyHeroPage extends Vue {
    type:string="create";
    uploadAvatarUrl: string = MyHeroAPI.uploadAvatarUrl;
    uploadSkillIconUrl: string = MyHeroAPI.uploadSkillIconUrl;
    baseUrl: string = baseUrl;
    localStorage:string = ''

    categoryOptons: Category[] = [];
    items: Item[] = [];
    heroes = [];
    maxSkillNumber = 4;
    maxPartnerNumber = 2;

    id: string = "";
    formdata: Hero = new Hero();
    formName: string = "ruleForm";
    rules: any = {
        avatar: [{ required: true, trigger: "blur" }],
        background: [{ required: true, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }],
        title: [{ required: true, trigger: "blur" }],
        categories: [{ required: true, trigger: "blur" }],
        losingItems: [
            { required: true, validator: this.validateItems, trigger: "blur" }
        ],
        leadingItems: [
            { required: true, validator: this.validateItems, trigger: "blur" }
        ],
        battleTip: [{ required: true, trigger: "blur" }],
        usageTip: [{ required: true, trigger: "blur" }],
        teamTip: [{ required: true, trigger: "blur" }],
    };
    testdata: any = {
        test: "fuck you"
    };

    mounted() {
        this.id = _.get(this, "$route.params.id");
        this.getAllCategories();
        this.getItems();
        this.getAllHeroes();
        if (!_.isEmpty(this.id)) {
            this.type = 'edit';
            this.getOne();
        }
        let _this = this
        this.$nextTick(()=>{
            _this.localStorage = getToken()
        })
    }
    async getOne() {
        MyHeroAPI.findOneAPI(this.$axios, this.id).then(res => {
            if (res.success) {
                this.formdata = res.data;
            }
        });
    }
    async getAllCategories() {
        let res = await MyCategoryAPI.findAllHeroCategories(this.$axios);
        this.categoryOptons = res.data;
    }
	async getItems() {
		let res = await MyItemAPI.findAllAPI(this.$axios);
		// 如果出现异常res会变成void类型，所以需要用lodash来取值
		if (res.success) {
			this.items = res.data;
		}
    }
    async getAllHeroes(){
        let res = await MyHeroAPI.findAllAPI(this.$axios);
        if(res.success)
        {
            this.heroes = res.data
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
        MyHeroAPI.createAPI(this.$axios, this.formdata).then(res => {
            if (res.success) {
                this.$message({
                    message: "创建成功",
                    type: "success"
                });
                this.$router.push(mypath.heroPath.list);
            }
        });
    }

    handleEdit() {
        MyHeroAPI.updateAPI(this.$axios, this.id, this.formdata).then(res => {
            if (res.success) {
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.$router.push(mypath.heroPath.list);
            }
        });
    }
    handleAvatarSuccess(res: any, file: object) {
        onUploadImgSuccess(this,this.formdata,'avatar',res)
    }
    handleBackgroundSuccess(res: any, file: object) {
        onUploadImgSuccess(this,this.formdata,'background',res)
    }
    onError(err:Error, file:File, fileList:File[]){
        onUploadImgError(this,err)
    }
    handleIconSuccess(res: any, item: skill) {
        onUploadImgSuccess(this,item,'icon',res)
        // this.$set(
        //     item,
        //     "icon",
        //     `${this.baseUrl}/${res.filePath}`.replace("api/static/", "")
        // );
    }
    resetForm(formName: string) {
        this.formdata = {...this.formdata, ...new Hero()}
    }
    validateItems(rule: any, value: any, callback: any) {
        if (value instanceof Array && value.length == 0) {
            callback(new Error("请选择出装"));
        } else {
            callback();
        }
    }
    deleteSkill(i){
        this.formdata.skills.splice(i,1)
    }
}
</script>
<style>
.skill-item {
    border-color: #409eff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    padding: 6px;
}
.background-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.background-uploader .el-upload:hover {
    border-color: #409eff;
}
.background-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 7rem;
    height: 7rem;
    line-height: 7rem;
    text-align: center;
}
.background {
    min-width: 7rem;
    height: 7rem;
    display: block;
}
.background-item {
    border-color: #409eff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    padding: 6px;
    margin-top: 1rem;
}
</style>
