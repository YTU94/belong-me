import React, { useState, useEffect } from "react"
import {  Input, Button, Card, Select, Table, message } from "antd"

const { Option } = Select
function Index(params) {
    const [decimal, setdecimal] = useState("2")
    const [decimal2, setdecimal2] = useState("")
    const [decimal8, setdecimal8] = useState("")
    const [decimal10, setdecimal10] = useState("")
    const [decimal16, setdecimal16] = useState("")

    const [value, setvalue] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        if (!value) {
            message.warning("请先输入")
            return false
        }

        switch (decimal) {
            case "2":
                if (!/^1[10]{1,31}$/.test(value)) {
                    message.warning("格式不正确")
                    break
                }
                setdecimal2(value)
                setdecimal8(parseInt(value, 2).toString(8))
                setdecimal10(parseInt(value, 2).toString(10))
                setdecimal16(parseInt(value, 2).toString(16))
                break
            case "8":
                if (!/^[0-7]+$/.test(value)) {
                    message.warning("格式不正确")
                    break
                }
                setdecimal2(parseInt(value, 8).toString(2))
                setdecimal8(value)
                setdecimal10(parseInt(value, 8).toString(10))
                setdecimal16(parseInt(value, 8).toString(16))
                break
            case "10":
                if (!/^[0-9]+$/.test(value)) {
                    message.warning("格式不正确")
                    break
                }
                setdecimal2(parseInt(value, 10).toString(2))
                setdecimal8(parseInt(value, 10).toString(8))
                setdecimal10(value)
                setdecimal16(parseInt(value, 10).toString(16))
                break
            case "16":
                if (!/^[A-Za-z0-9]+$/.test(value)) {
                    message.warning("格式不正确")
                    break
                }
                setdecimal2(parseInt(value, 16).toString(2))
                setdecimal8(parseInt(value, 16).toString(8))
                setdecimal10(parseInt(value, 16).toString(10))
                setdecimal16(value)
                break
            default:
                break
        }
    }
    const handleChangeDecimal = e => {
        setdecimal(e)
    }
    const onChange = e => {
        setvalue(e.target.value)
    }
    const clear = e => {
        setvalue("")
        setdecimal2("")
        setdecimal8("")
        setdecimal10("")
        setdecimal16("")
    }

    const copy = e => {
        message.warning("逗你玩呢，自己复制下吧")
    }
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>
        },
        {
            title: "result",
            dataIndex: "result",
            key: "result"
        },

        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    {/* <Divider type='vertical' /> */}
                    <a onClick={copy}>复制</a>
                </span>
            )
        }
    ]

    const data = [
        {
            key: "1",
            name: "二进制",
            result: decimal2
        },
        {
            key: "2",
            name: "八进制",
            result: decimal8
        },
        {
            key: "3",
            name: "十进制",
            result: decimal10
        },
        {
            key: "4",
            name: "十六二进制",
            result: decimal16
        }
    ]

    return (
        <div>
            <div className='activitys-list'>
                <h3>进制转换</h3>
                <div className=''>
                    <Input placeholder='Basic usage' value={value} onChange={onChange} style={{ width: 200 }} />
                    &nbsp;进制：
                    <Select defaultValue={decimal} style={{ width: 120 }} onChange={handleChangeDecimal}>
                        <Option value='2'>2</Option>
                        <Option value='8'>8</Option>
                        <Option value='10'>10</Option>
                        <Option value='16'>16</Option>
                    </Select>
                    &nbsp;
                    <Button type='primary' onClick={handleSubmit}>
                        转换
                    </Button>
                    &nbsp;
                    <Button type='warn' onClick={clear}>
                        清空
                    </Button>
                </div>
                <br />
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Index
