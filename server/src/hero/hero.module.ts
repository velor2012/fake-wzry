import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import Hero from './Hero.model';
import HeroController from './hero.controller';
import HeroService from './hero.service';

@Module({
    imports:[TypegooseModule.forFeature([      {
        typegooseClass: Hero,
        schemaOptions: {
          collection: "heroes"
        }
      }])],
    controllers: [HeroController],
    providers:[HeroService]
})
export class HeroModule {}
