import axios from "axios"

axios.defaults.baseURL = "http://ggapi.ytuj.cn"

const baseURL = "http://api.ytuj.cn"

const instance = function(baseUrl, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: params.method,
            url: baseUrl +params.url,
            data: params.data
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const submitShell = function(data) {
    return instance({
        method: "post",
        url: "/api/doshell",
        data: data
    })
}

const getArticleList = data => {
    return instance(baseURL, {
        method: "get",
        baseUrl: baseURL,
        url: "/api/v1/ytu/articles",
        data: data
    })
}
export default {
    submitShell,
    getArticleList
}
