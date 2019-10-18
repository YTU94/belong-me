import axios from "axios"
import { message } from "antd"

const defaultBaseURL = "http://ggapi.ytuj.cn"
// const baseURL = "http://api.ytuj.cn"
const loacalBaseURL = "http://localhost:3001"

const instance = function(baseUrl, params) {
    return new Promise((resolve, reject) => {
        message.loading("加载中", 0)
        // const hide = message.loading('Action in progress..', 0);
        axios({
            method: params.method,
            url: baseUrl + params.url,
            data: params.data || {},
            params: params.params || {},
            timeout: 5000
        })
            .then(res => {
                message.destroy()
                if (res.status & 200) {
                    if (res.data.code === 0) {
                        resolve(res.data)
                    } else {
                        message.info(res.data.msg || "未知错误")
                        reject(res.data)
                    }
                } else {
                    message.error(res.data.msg || "未知错误")
                }
            })
            .catch(err => {
                message.destroy()
                message.error(err.msg || "未知错误")
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

const getOtherIdList = data => {
    return instance(defaultBaseURL, {
        method: "get",
        url: "/api/otherIdList",
        data: data
    })
}

const getMsgList = data => {
    return instance(defaultBaseURL, {
        method: "get",
        url: "/api/v1/messageList",
        data: data
    })
}

const sendMsg = data => {
    return instance(defaultBaseURL, {
        method: "post",
        url: "/api/v1/sendMessage",
        data: data
    })
}

const getMailCode = data => {
    return instance(defaultBaseURL, {
        method: "get",
        url: "/api/v1/getMailCode",
        params: data
    })
}

const regist = data => {
    return instance(defaultBaseURL, {
        method: "post",
        url: "/api/v1/regist",
        data: data
    })
}
const login = data => {
    return instance(defaultBaseURL, {
        method: "post",
        url: "/api/v1/login",
        data: data
    })
}
export default {
    submitShell,
    getAppleidList,
    getOtherIdList,
    getMsgList,
    sendMsg,
    getMailCode,
    regist,
    login
}
