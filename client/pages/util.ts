import { AxiosResponse } from "axios";
import _ from "lodash";
const config = require("../config.json");

export var baseUrl: string =
    process.env.NODE_ENV == "production"
        ? (baseUrl = config.prod_url)
        : (baseUrl = config.dev_url);

export function getToken() {
    let localStorage = _.get(window, "localStorage");
    if (localStorage) {
        return localStorage.getItem("auth._token.local");
    } else {
        return null;
    }
}
export function onUploadImgSuccess(
    app: Vue,
    whichToSet: object,
    attribute: string,
    res: any
) {
    app.$set(
        whichToSet,
        attribute,
        getUploadImgUrl(res,baseUrl)
    );
}
export function onUploadImgError(app: Vue, err: Error) {
    let error: Error = JSON.parse(err.message);
    app.$message.error(error.message);
}
export function getUploadImgUrl(res: any, baseUrl: string) { 
    return `${baseUrl}/${res.filePath}`.replace("api/static/", "")
}
