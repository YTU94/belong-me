import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Input, Button, Select, Table, message } from "antd"
import Api from "../../../utils/api"
import Util from "y-js-utils"

const { Option } = Select

function Home(params) {
    const userId = useSelector(state => {
        const userInfo = state.userInfo
        return userInfo.id
    })

    const [decimal, setdecimal] = useState("")
    const [hasResult, sethasResult] = useState(0)
    const [collected, setcollected] = useState(0)
    // const [userInfo, setuserInfo] = useState(localStorage.getItem("userInfo"))
    const [name, setname] = useState("--")
    const [unit, setunit] = useState("--")
    const [price, setprice] = useState("--")
    const [changePercent24Hr, setchangePercent24Hr] = useState("")
    const [collectList, setcollectList] = useState([])
    const [value, setvalue] = useState("")

    useEffect(() => {
        console.log(Util, "userinfo change")
        getCollectList()
    }, [userId])
    useEffect(() => {
        if (!userId) return
        const tarArr = collectList.filter(e => e.userId === userId && e.name === name)
        if (tarArr.length) {
            setcollected(tarArr[0].collected)
        }
    }, [name])
    // const updateCollected = e => {
    //     console.log("do updateCollected")
    //     const tarArr = collectList.filter(e => e.id === userId)
    //     if (tarArr.length) {
    //         setcollected(tarArr[0].collected)
    //     }
    //     return tarArr[0] && tarArr[0].collected || "--"
    // }
    /*
     * methods
     */
    const handleSubmit = e => {
        e.preventDefault()
        if (!value) {
            message.warning("请先输入")
            return false
        }
        setdecimal(value)
        search()
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
        search()
    }

    const search = e => {
        if (!value) return
        setcollected(0)
        Api.btcSearch({
            symbol: value
        }).then(res => {
            let r = res.data && res.data[0]
            sethasResult(1)
            setname(r.symbol)
            setprice((+r.priceUsd).toFixed(4))
            setunit("USD")
            setchangePercent24Hr(Number(r.changePercent24Hr).toFixed(2))
            getCollectList()
        })
    }
    const collect = e => {
        Api.collectBtc({
            name: e.symbol || e.name,
            symbol: e.symbol || e.name,
            userId: userId,
            collected: e.collected === 0 ? 1 : 0
        }).then(res => {
            message.success("操作成功")
            setcollected(e.collected === 0 ? 1 : 0)
            getCollectList()
        })
    }
    const getCollectList = e => {
        if (!userId) return

        Api.btcCollectList({
            userId: userId
        }).then(res => {
            if (Array.isArray(res.data)) {
                setcollectList(res.data)
            }
        })
    }

    const data = [
        {
            key: "1",
            name: name,
            unit: unit,
            price: price,
            changePercent24Hr: changePercent24Hr,
            collected: collected
        }
    ]
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
            title: "Collected",
            key: "collected",
            render: record => (
                <span>
                    <Button type='primary' disabled={!userId || !hasResult} onClick={collect.bind(this, record)}>
                        {!userId ? "请先登录" : record.collected === 0 ? "收藏" : "已收藏"}
                    </Button>
                </span>
            )
        }
    ]

    return (
        <div className='activitys-list'>
            <br />
            <div className=''>
                <Input placeholder='Input Currency' value={value} onChange={onChange} style={{ width: 200 }} />
                &nbsp;&nbsp;
                <Select defaultValue={decimal} style={{ width: 120 }} onChange={handleChangeDecimal}>
                    {collectList.map((e, i) => (
                        <Option key={i} value={e.symbol}>
                            {e.symbol}
                        </Option>
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
