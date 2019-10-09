import React, { useState, useEffect } from "react"
import { List, Avatar } from "antd"
import PageFooter from "../../components/pageFooter"
import Api from "../../utils/api"

import "./index.less"

function Home() {
    const [listData, setListdata] = useState([])
    const copyPwd = e => {
        const id = `pwdId${e.id}` || 0
        var Url2 = document.getElementById(id)
        Url2.select()
        document.execCommand("copy", true)
    }

    useEffect(() => {
        Api.getAppleidList({}).then(res => {
            setListdata(res.data)
        })
    }, [])

    return (
        <div className='app'>
            <header className='App-header' />

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
