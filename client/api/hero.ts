import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosError } from 'axios'
import CommonAPI from './common';
import { MyResponse } from './index';
export class HeroAPI extends CommonAPI  {
    // protected prefix = '/categories'
    public uploadAvatarUrl: string
    public uploadSkillIconUrl: string
    constructor() {
        super('/heroes');
        this.uploadAvatarUrl = this.prefix + '/avatar'
        this.uploadSkillIconUrl = this.prefix + "/skillIcons"
    }
}
const MyHeroAPI = new HeroAPI()
export default MyHeroAPI