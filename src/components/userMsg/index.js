import React, { useState } from "react"
import { Button, Modal, Input, Form, Icon } from "antd"
import "./index.less"
import Api from "../../utils/api"
import axios from "axios"
export default function Index(params) {
    const [account, setaccount] = useState("1296642816@qq.com")
    const [nickName, setnickName] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [valCode, setvalCode] = useState("")
    const [messageId, setmessageId] = useState("")

    const [showLoginForm, setshowLoginForm] = useState(false)
    const [showRegistForm, setshowRegistForm] = useState(false)
    const loginSubmit = e => {
        setshowLoginForm(true)
    }
    const registSubmit = e => {
        setshowRegistForm(true)
        Api.regist({
            messageId: messageId,
            code: valCode,
            nickName: nickName,
            password: password
        }).then(res => {
            console.log(res)
        })
    }
    const getCode = e => {
        Api.getMailCode({
            email: account
        }).then(res => {
            console.log(res)
            setmessageId(res.messageId)
        })
    }
    return (
        <div className='user-right-tab'>
            <Button type='primary' onClick={() => setshowLoginForm(true)}>
                登录
            </Button>
            <Button type='' onClick={() => setshowRegistForm(true)}>
                注册
            </Button>
            <Modal title='登录' visible={showLoginForm} onCancel={() => setshowLoginForm(false)} onOk={loginSubmit}>
                account: <Input placeholder='' value={account} onChange={e => setaccount(e.target.value)}></Input>
                password: <Input placeholder='' type='password' value={password} onChange={e => setpassword(e.target.value)}></Input>
            </Modal>
            <Modal title='注册' visible={showRegistForm} onCancel={() => setshowRegistForm(false)} onOk={registSubmit}>
                <Form>
                    <Form.Item>
                        <Input
                            placeholder='nickname'
                            prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />}
                            value={nickName}
                            onChange={e => setnickName(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder='email'
                            prefix={<Icon type='email' style={{ color: "rgba(0,0,0,.25)" }} />}
                            addonAfter={
                                <div className=''>
                                    <Button onClick={getCode}>获取验证吗</Button>
                                </div>
                            }
                            value={account}
                            onChange={e => setaccount(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder='password'
                            prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
                            type='password'
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder='password'
                            prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
                            type='password'
                            value={confirmPassword}
                            onChange={e => setconfirmPassword(e.target.value)}
                        ></Input>
                    </Form.Item>

                    <Form.Item>
                        <Input
                            placeholder='validate code'
                            prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />}
                            value={valCode}
                            onChange={e => setvalCode(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item></Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
