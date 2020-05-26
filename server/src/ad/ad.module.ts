import { Module } from '@nestjs/common';
import Ad from './ad.model';
import AdController from './ad.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import AdService from './ad.service';

@Module({
    imports: [TypegooseModule.forFeature([Ad])],
    providers:[AdService],
    controllers:[AdController]
})
export class AdModule {}
