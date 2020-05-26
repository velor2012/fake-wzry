import { Strategy, IStrategyOptions } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import {
    Injectable,
    UnauthorizedException,
    HttpException,
    HttpStatus,
    HttpService,
} from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import Admin from "src/admin/Admin.model";
import { ReturnModelType } from "@typegoose/typegoose";
import * as bcrypt from "bcrypt";
import _ = require("lodash");

//登录的策略
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(Admin)
        private readonly AdminModel: ReturnModelType<typeof Admin>,
        private readonly httpService: HttpService
    ) {
        super({
            usernameField: "name",
            passwordField: "password",
        } as IStrategyOptions);
    }

    async validate(username: string, password: string): Promise<any> {
        let newUserName = username.replace('github','')
        let type = (newUserName == username) ? 'common':'github'
        let user: any
        if (type == 'common') {
            user = await this.AdminModel.findOne({
                name: username,
            }).select("+password")
            if (!user) {
                throw new HttpException(
                    "没有此用户",
                    HttpStatus.UNPROCESSABLE_ENTITY
                );
            } else if (!bcrypt.compareSync(password, user.password)) {
                throw new HttpException("密码错误", HttpStatus.UNAUTHORIZED);
            }

        } else { 
            //下面是github登录方法
            user = await this.AdminModel.findOne({
                githubId: newUserName,
            })
            if (!user) {
                throw new HttpException(
                    "此github用户未绑定已注册的管理员",
                    HttpStatus.UNPROCESSABLE_ENTITY
                );
            }
            let res = await this.httpService.get(process.env.GIHUB_USERINFO_URL, {
                params: {
                    'access_token':password
                }
            }).toPromise()
            if (String(_.get(res, 'data.id')) !== newUserName) { 
                throw new HttpException(
                    "access_token对应的用户与id对应的用户不一致",
                    HttpStatus.UNPROCESSABLE_ENTITY
                );
            }
        }
        return user;
    }
}
