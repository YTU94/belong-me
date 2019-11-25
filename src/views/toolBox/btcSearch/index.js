import React, { useState, useEffect } from "react"
import { Input, Button, Select, Divider, Table, message } from "antd"
import Api from "../../../utils/api"
const { Option } = Select

function Index(params) {
    const [decimal, setdecimal] = useState("")

    const [name, setname] = useState("--")
    const [unit, setunit] = useState("--")
    const [price, setprice] = useState("--")
    const [changePercent24Hr, setchangePercent24Hr] = useState("")

    const [value, setvalue] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        if (!value) {
            message.warning("请先输入")
            return false
        }
        search()
    }

    const search = e => {
        Api.btcSearch({
            symbol: value
        }).then(res => {
            let r = res.data && res.data[0]
            setname(r.symbol)
            setprice((+r.priceUsd).toFixed(4))
            setunit("USD")
            setchangePercent24Hr(Number(r.changePercent24Hr).toFixed(2))
        })
    }
    const onChange = e => {
        setvalue(e.target.value)
    }
    const clear = e => {
        setvalue("")
    }
    const handleChangeDecimal = e => {
        setvalue(e)
    }
    useEffect(() => {
        search()
    }, [value])
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>
        },
        {
            title: "price",
            dataIndex: "price",
            key: "price"
        },

        {
            title: "24Hr",
            dataIndex: "changePercent24Hr",
            key: "changePercent24Hr",
            render: text => (
                <a style={{ color: Number(text) < 0 ? "red" : "green" }}>
                    {text}
                    {text ? "%" : "--"}
                </a>
            )
        },
        {
            title: "unit",
            dataIndex: "unit",
            key: "unit"
        }
        // {
        //     title: "Action",
        //     key: "action",
        //     render: (text, record) => (
        //         <span>
        //             {/* <Divider type='vertical' /> */}
        //             <a>⭐️</a>
        //         </span>
        //     )
        // }
    ]

    const data = [
        {
            key: "1",
            name: name,
            unit: unit,
            price: price,
            changePercent24Hr: changePercent24Hr
        }
    ]
    const arr = [{ value: "BTC" }, { value: "ETH" }, { value: "ATOM" }, { value: "EOS" }, { value: "SEELE" }]

    return (
        <div className='activitys-list'>
            <br />
            <div className=''>
                <Input placeholder='Input Currency' value={value} onChange={onChange} style={{ width: 200 }} />
                &nbsp;&nbsp;
                <Select defaultValue={decimal} style={{ width: 120 }} onChange={handleChangeDecimal}>
                    {arr.map(e => (
                        <Option value={e.value}>{e.value}</Option>
                    ))}
                </Select>
                &nbsp;&nbsp;
                <Button type='primary' onClick={handleSubmit}>
                    查找
                </Button>
                &nbsp;&nbsp;
                <Button className='hide-in-h5' type='default' onClick={clear}>
                    清空
                </Button>
            </div>
            <br />
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Index
