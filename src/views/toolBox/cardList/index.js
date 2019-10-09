import React, { useState, useEffect } from "react"
import { Icon, Card, Col, Row, Timeline, Form, Input, Button, Avatar } from "antd"
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
            <Row gutter='16'>
                <Col span='8'>
                    <Card>
                        <Link to='/toolBox/dataReverse'>
                            <Meta
                                avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                                title='进制转换'
                                description='不同进制之间的转换'
                            />
                        </Link>
                    </Card>
                </Col>
                <Col span='8'>
                    <Card>
                        <Link to='/toolBox/uploadImg'>
                            <Meta
                                avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                                title='Mini图床'
                                description='个人图片云存储'
                            />
                        </Link>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Index
