import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
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
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(Admin)
        private readonly AdminModel: ReturnModelType<typeof Admin>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        } as StrategyOptions);
    }

    async validate(id: any): Promise<any> {
        let user = await this.AdminModel.findById(id.id);
        //前面的构造函数已经拦截了异常，不需要在处理
        // if (!user) {
        //     throw new HttpException("token校验失败", HttpStatus.UNAUTHORIZED);
        // }
        return user;
    }
}
