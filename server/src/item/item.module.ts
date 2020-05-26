import { Module } from '@nestjs/common';
import Item from './item.model';
import { TypegooseModule } from 'nestjs-typegoose';
import ItemController  from './item.controller';
import ItemService from './item.service';

@Module({
    imports: [TypegooseModule.forFeature([Item])],
    controllers: [ItemController],
    providers:[ItemService]
})
export class ItemModule {}
