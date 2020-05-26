import { prop, getModelForClass } from '@typegoose/typegoose';
export class Post {
    @prop()
    public title: string;
    @prop()
    public content: string;
    @prop()
    public resume: string;
  }
  