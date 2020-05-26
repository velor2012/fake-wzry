import { Strategy, StrategyOptions } from "passport-github";
import { PassportStrategy } from "@nestjs/passport";
import {
    Injectable,
    UnauthorizedException,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import Admin from "src/admin/Admin.model";
import { ReturnModelType } from "@typegoose/typegoose";
import * as bcrypt from "bcrypt";

//登录的策略
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy,'github') {
    constructor(
        @InjectModel(Admin)
        private readonly AdminModel: ReturnModelType<typeof Admin>
    ) {
        super({
            clientSecret:process.env.CLIENT_SECRET,
            clientID: process.env.CLIENT_ID,
            callbackURL: process.env.CALLBACK_URL
        } as StrategyOptions);
    }

    async validate(accessToken, refreshToken, profile, cb): Promise<any> {
        //前面的构造函数已经拦截了异常，不需要在处理
        return { ...profile,accessToken };
    }
}
