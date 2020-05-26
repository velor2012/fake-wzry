import config from "~/config.json"
import { AxiosError, AxiosResponse } from 'axios';
import { Vue } from "nuxt-property-decorator";
import _ from "lodash";
export default function ({ $axios, redirect }) {
  if (process.env.NODE_ENV !== 'production') {
        $axios.setBaseURL(config.dev_url)
    }else{
        $axios.setBaseURL(config.prod_url)
  }
    $axios.onError((error: AxiosError) => {
        Vue.prototype.$message({
            type: 'error',
            message: _.get(error,'response.data.message')
        })
      return error.response;
    })
}
  