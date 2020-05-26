import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostModule } from './post/post.module';
import {TypegooseModule } from 'nestjs-typegoose';
import { CategoryModule } from './category/category.module';
import {ItemModule}  from './item/item.module';
import { HeroModule } from './hero/hero.module';
import { ArticleModule } from './article/article.module';
import { AdModule } from './ad/ad.module';
import { AdminModule } from './admin/admin.module';
import { DbModule } from './lib/db.module';
import { CommonModule } from './lib/lib.module';
import { OtherModule } from './other/other.module';




// const config = require('../config.json');
// let { mongodb, host, port } = config;
// let { username, password, db, mongo_port, mongo_host } = mongodb;
@Module({
  imports: [
    DbModule,
    CommonModule,
    PostModule,
    CategoryModule,
    ItemModule,
    HeroModule,
    ArticleModule,
    AdModule,
    AdminModule,
    OtherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
