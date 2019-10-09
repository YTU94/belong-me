import React, { useState, useEffect } from "react"
import { Icon, Timeline, Form, Input, Button, Card, Avatar } from "antd"
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"

let id = 0
const { Meta } = Card

function Index(params) {
    const [message, setmessage] = useState("")
    const [email, setemail] = useState("")
    const msgChange = e => {
        setmessage(e.target.value)
    }
    const emailChange = e => {
        setemail(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
    }
    const submitMsg = e => {}
    return (
        <div className='activitys-list'>
            <Card style={{ width: 300, marginTop: 16 }}>
                <Meta
                    avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                    title='Card title'
                    description='This is the description'
                />
                <Link to='/toolBox/dataReverse'> dataReverse </Link>
            </Card>

            <Card style={{ width: 300, marginTop: 16 }}>
                <Meta
                    avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                    title='Card title'
                    description='This is the description'
                />
                <Link to='/toolBox/uploadImg'> uploadImg </Link>
            </Card>

            <Card style={{ width: 300, marginTop: 16 }}>
                <Meta
                    avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                    title='Card title'
                    description='This is the description'
                />
            </Card>
        </div>
    )
}

export default Index
