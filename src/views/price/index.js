import React, { useState, useEffect } from "react"
import { List, Avatar, Button } from "antd"
import PageFooter from "../../components/pageFooter"
import Api from "../../utils/api"

import "./index.less"

function Index() {
    const [listData, setListdata] = useState([])
    const initData = e => {
        Api.getAppleidList({}).then(res => {
            setListdata(res.data)
        })
    }
    const copyPwd = e => {
        // const id = `pwdId${e.id}` || 0
        // var Url2 = document.getElementById(id)
        // Url2.select()
        // document.execCommand("copy", true)
    }
    const changeList = e => {
        console.log(e)
        if (e == 0) {
            initData()
        }
        Api.getOtherIdList({}).then(res => {
            let arr = res.data.filter(i => i.type === e)
            setListdata(spliceAccountList(arr))
        })
    }
    useEffect(() => {
        initData()
    }, [])

    const addIncome = e => {}
    const spliceAccountList = arr => {
        let a = []
        arr.forEach(e => {
            let accountArr = e.account.split(",")
            let pwdArr = e.password.split(",")
            if (accountArr.length == pwdArr.length) {
                accountArr.forEach((f, i) => {
                    a.push({
                        account: f,
                        name: e.name,
                        remark: e.remark,
                        password: pwdArr[i]
                    })
                })
            }
        })
        return a
    }

    return <iframe src='http://ytuj.cn/' frameborder='0' className='iframe-page'></iframe>
}

export default Index
