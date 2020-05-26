import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosError } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './index';
export class HeroesAPI {
    private findAllUrl = '/other/heroes/list'
    private findOneUrl = '/heroes'
	public async findAllAPI(
		axios: NuxtAxiosInstance,
	): Promise<MyResponse> {
		let error = false;
		let res = await axios
			.get(`${this.findAllUrl}`)
		return generateResponse(res as AxiosResponse);
    }
    public async findOneAPI(
        axios: NuxtAxiosInstance,
        id:string
	): Promise<MyResponse> {
        let error = false;
		let res = await axios
            .get(`${this.findOneUrl}/${id}`, {
                params: {
                    populate: true
                }
            })
        console.log('inininininini')
		return generateResponse(res as AxiosResponse);
    }
}
const MyHeroesApi = new HeroesAPI()
export default MyHeroesApi