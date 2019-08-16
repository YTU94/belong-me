import axios from "axios"

axios.defaults.baseURL = "http://ggapi.ytuj.cn"

const instance = function(params) {
    return new Promise((resolve, reject) => {
        axios({
            method: params.method,
            url: params.url,
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

export default {
    submitShell
}
