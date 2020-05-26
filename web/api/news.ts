import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosError } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './index';
export class NewsAPI {
    private prefix = '/other/news/list'
	public async findAllAPI(
		axios: NuxtAxiosInstance,
		newsSize: number=5,
	): Promise<MyResponse> {
		let error = false;
		let res = await axios
			.get(`${this.prefix}`, {
				params: {
					newsSize: newsSize,
				},
			})
		return generateResponse(res as AxiosResponse);
	}
}
const MyNewsApi = new NewsAPI()
export default MyNewsApi