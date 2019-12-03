import React, { useState, useEffect } from "react"
import { Input, Button, Select, Table, message } from "antd"
import Api from "../../../utils/api"
// import toNumber from "y-js-utils"
import Util from "y-js-utils"

const { Option } = Select

function Home(params) {
    const [decimal, setdecimal] = useState("")
    // const [userInfo, setuserInfo] = useState(localStorage.getItem("userInfo"))
    const [name, setname] = useState("--")
    const [unit, setunit] = useState("--")
    const [price, setprice] = useState("--")
    const [changePercent24Hr, setchangePercent24Hr] = useState("")
    const [arr, setarr] = useState([])
    const [value, setvalue] = useState("")

    let userInfo = (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"))) || {}

    const handleSubmit = e => {
        e.preventDefault()
        if (!value) {
            message.warning("请先输入")
            return false
        }
        setdecimal(value)
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
        setdecimal(e)
    }
    const getCollectList = e => {
        if (!userInfo) {
            return false
        }
        Api.btcCollectList({
            userId: userInfo.id || 0
        }).then(res => {
            if (Array.isArray(res.data)) {
                setarr(res.data)
            }
        })
    }

    const collect = e => {
        if (!userInfo) {
            message.warning("请先登录")
            return false
        }
        Api.collectBtc({
            name: e.symbol || e.name,
            symbol: e.symbol || e.name,
            userId: userInfo.id
        }).then(res => {
            message.success("收藏成功")
            getCollectList()
        })
    }
    useEffect(() => {
        console.log(Util.base.toNumber('2'), "userinfo change")
        getCollectList()
    }, [])
    useEffect(() => {
        search()
    }, [decimal])

    useEffect(() => {
        getCollectList()
    }, [])
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
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    {/* <Divider type='vertical' /> */}
                    <a onClick={collect.bind(this, text)}>收藏</a>
                </span>
            )
        }
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

    return (
        <div className='activitys-list'>
            <br />
            <div className=''>
                <Input placeholder='Input Currency' value={value} onChange={onChange} style={{ width: 200 }} />
                &nbsp;&nbsp;
                <Select defaultValue={decimal} style={{ width: 120 }} onChange={handleChangeDecimal}>
                    {arr.map(e => (
                        <Option key={e.symbol} value={e.symbol}>{e.symbol}</Option>
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

export default Home
