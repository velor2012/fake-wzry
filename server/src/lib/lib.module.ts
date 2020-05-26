import { DynamicModule, Module, Global, HttpModule } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import Admin from "src/admin/Admin.model";
import {ConfigModule} from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { GithubStrategy } from "./strategy/github.strategy";


@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
            useFactory:()=>{
                return {
                    secret: process.env.SECRET,
                    signOptions: {expiresIn:'1d'}
                }
            }
        }),
        TypegooseModule.forFeature([Admin]),
        HttpModule
    ],
    providers: [
        LocalStrategy,JwtStrategy,GithubStrategy
    ],
    exports: [ LocalStrategy,JwtStrategy,JwtModule,GithubStrategy],
})
export class CommonModule {}
