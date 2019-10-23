import React, { useState, useEffect } from "react"
import { List, Avatar, Button } from "antd"
import PageFooter from "../../components/pageFooter"
import Api from "../../utils/api"

import "./index.less"

function Home() {
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

    return (
        <div className='app'>
            <br />
            <section>
                <Button type='link' onClick={changeList.bind(this, 0)}>
                     AppleId
                </Button>
                <Button type='link' onClick={changeList.bind(this, 1)}>
                    ☁️ 百度云
                </Button>
                <Button type='link' onClick={changeList.bind(this, 2)}>
                    ⚡️ 迅雷
                </Button>
            </section>
            <List
                itemLayout='vertical'
                size='large'
                pagination={{
                    onChange: page => {
                        console.log(page)
                    },
                    pageSize: 5
                }}
                dataSource={listData}
                footer={
                    <div>
                        <b>请谨慎使用</b>，出任何问题与本站无关
                    </div>
                }
                renderItem={item => (
                    <List.Item key={item.title}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>{item.id}</Avatar>}
                            title={
                                <a href={item.href}>
                                    {item.name} : {item.account}
                                </a>
                            }
                            description={item.remark}
                        />
                        <div>
                            密码 ： &nbsp;
                            <a href='#' onClick={copyPwd.bind(this, item)}>
                                {item.password}
                            </a>
                        </div>
                    </List.Item>
                )}
            />
            <PageFooter />
        </div>
    )
}

export default Home
