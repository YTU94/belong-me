import axios from "axios"
import { message } from "antd"

// axios.defaults.baseURL = "http://ggapi.ytuj.cn"
const defaultBaseURL = "http://ggapi.ytuj.cn"
const baseURL = "http://api.ytuj.cn"

const instance = function(baseUrl, params) {
    return new Promise((resolve, reject) => {
        message.loading("加载中", 0)
        axios({
            method: params.method,
            url: baseUrl + params.url,
            data: params.data
        })
            .then(res => {
                message.destroy()
                resolve(res)
            })
            .catch(err => {
                message.destroy()
                reject(err)
            })
    })
}

const submitShell = function(data) {
    return instance(defaultBaseURL, {
        method: "post",
        url: "/api/doshell",
        data: data
    })
}

const getAppleidList = data => {
    return instance(defaultBaseURL, {
        method: "get",
        url: "/api/appleidList",
        data: data
    })
}
export default {
    submitShell,
    getAppleidList
}
