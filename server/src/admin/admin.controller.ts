import {
    Controller,
    Injectable,
    Get,
    UsePipes,
    Body,
    Param,
    Put,
    Delete,
    Post,
    Query,
    ValidationPipe,
    UseFilters,
    UseInterceptors,
    UploadedFile,
    Req,
    Res,
} from "@nestjs/common";
import {
    ApiTags,
} from "@nestjs/swagger";
import {DocumentType } from "@typegoose/typegoose";
import { FileInterceptor } from "@nestjs/platform-express";
import Admin from "./Admin.model";
import LoginDto from "./login.dto";
import { JwtService } from "@nestjs/jwt";
import AdminUpdateDto from "./admin.update.dto";
import Auth from "src/lib/decorator/auth.decorator";
import { User } from "src/lib/decorator/user.decorator";
import QueryDTO from "src/lib/dto";
import AdminService from './admin.service';
@ApiTags("管理员")
@Injectable()
@UsePipes(new ValidationPipe({ transform: true }))
@Controller("admins")
export default class AdminController {
    constructor(
        private readonly AdminService: AdminService,
        private readonly JwtService: JwtService
    ) {}
    @Get()
    @Auth("获取所有管理员",['admin'],"jwt")
    async index(@Query() query: QueryDTO) {
        let { page, pageSize, sortBy } = query;
        let sb = {};
        sb[sortBy] = -1;

        return await this.AdminService.getAllAdmins(pageSize,page,sb)
    }
    @Get("currentUser")
    @Auth("获取当前登录的用户",['admin','user'],"jwt")
    async getCurrentUser(@User() user:DocumentType<Admin>) {
        return user
    }

    @Post()
    @Auth("创建管理员",['admin'],"jwt")
    async create(@Body() body: Admin) {
        return await this.AdminService.create(body);
    }

    @Post("avatar")
    @UseInterceptors(FileInterceptor("file"))
    @Auth("上传管理员头像",['admin'],"jwt")
    async upload(@UploadedFile() file, @Body() body: Object) {
        return await this.AdminService.upload(file,body)
    }

    @Get("logout")
    @Auth("注销用户",['admin','user'],"jwt")
    async logout() {
        return 'ok'
    }

    @Get(":id")
    @Auth("获取管理员详情",['admin'],"jwt")
    async detail(@Param("id") id: string, @Req() req) {
        if (!req) return "";
        return await this.AdminService.detail(id);
    }
    
    @Put(":id")
    @Auth("更新管理员",['admin'],"jwt")
    async update(@Param("id") id: string, @Body() body: AdminUpdateDto) {
        return await this.AdminService.update(id, body);
    }

    @Delete(":id")
    @Auth("删除管理员",['admin'],"jwt")
    async _delete(@Param("id") id: string) {
        return await this.AdminService._delete(id);
    }

    @Post("login")
    @Auth("登录",null,"local")
    async login(@Body() body: LoginDto, @User() user: DocumentType<Admin>) {
        //sign的参数必须使用对象，否则无法设置过期时间
        return { token: this.JwtService.sign({ id: String(user._id) }) };
    }

    @Get("login/github")
    @Auth("登录",null, "github")
    async loginGithub(@User() user: DocumentType<Admin>) {
        //sign的参数必须使用对象，否则无法设置过期时间
        return user
    }

    @Get("login/github/callback")
    @Auth("登录",null, "github")
    async loginGithubCallback(@Req() req,@Res() res) {
        //sign的参数必须使用对象，否则无法设置过期时间
        res.redirect(`${process.env.FRONT_URL}/login?id=${req.user.id}&accessToken=${req.user.accessToken}`) 
    }
}
