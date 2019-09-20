import React, { useState, useEffect } from "react"
import { List, Avatar, Icon, InputNumber } from "antd"
import PageFooter from "../../components/pageFooter"
import Api from "../../utils/api"

import "./app.less"

function Home() {
    const [listData, setListdata] = useState([])
    const [count, setCount] = useState(0)
    const copyPwd = e => {
        const id = `pwdId${e.id}` || 0
        var Url2 = document.getElementById(id)
        console.log(Url2)
        Url2.select()
        document.execCommand("copy", true)
    }

    useEffect(() => {
        console.log(1)
        // getData()
        document.title = `You clicked ${count} times`
        Api.getAppleidList({}).then(res => {
            console.log(1)
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
                    pageSize: 3
                }}
                dataSource={listData}
                footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        // actions={[
                        //     <IconText type='star-o' text='156' key='list-vertical-star-o' />,
                        //     <IconText type='like-o' text='156' key='list-vertical-like-o' />,
                        //     <IconText type='message' text='2' key='list-vertical-message' />
                        // ]}
                        // extra={<img width={272} alt='logo' src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar || item.id} />}
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
