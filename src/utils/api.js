import axios from "axios"
import { message } from "antd"

// axios.defaults.baseURL = "http://ggapi.ytuj.cn"
const defaultBaseURL = "http://ggapi.ytuj.cn"
// const baseURL = "http://api.ytuj.cn"

const instance = function(baseUrl, params) {
    return new Promise((resolve, reject) => {
        // message.loading("加载中", 0)
        // const hide = message.loading('Action in progress..', 0);
        axios({
            method: params.method,
            url: baseUrl + params.url,
            data: params.data
        })
            .then(res => {
                message.destroy()
                if (res.status & 200) {
                    resolve(res.data)
                } else {
                    // message.error(res.data.msg || "未知错误")
                }
            })
            .catch(err => {
                message.destroy()
                // message.error(err.msg || "未知错误")
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
