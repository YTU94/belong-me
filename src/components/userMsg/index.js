import React, { useState, useContext } from "react"
import { Button, Modal, Input, Form, Icon, message } from "antd"
import { useDispatch } from "react-redux"

import "./index.less"
import Api from "../../utils/api"
import { addUserInfo } from "src/redux/actions"

export default function Index(params) {
    const dispatch = useDispatch()
    // const { state, dispatch } = useContext(myContext)
    const [timeMsg, settimeMsg] = useState("获取验证码")
    const [isLogined, setisLogined] = useState(false)
    // login
    const [account, setaccount] = useState("453980450@qq.com")
    const [pass, setpass] = useState("261011")
    // regist
    const [nickName, setnickName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [valCode, setvalCode] = useState("")
    const [messageId, setmessageId] = useState("")

    const [showLoginForm, setshowLoginForm] = useState(false)
    const [showRegistForm, setshowRegistForm] = useState(false)
    const loginSubmit = e => {
        setshowLoginForm(true)
        Api.login({
            account: account,
            pass: pass
        }).then(res => {
            setshowLoginForm(false)
            setisLogined(true)
            dispatch(addUserInfo(res.data))
            message.success("登录成功")
        })
    }
    const registSubmit = e => {
        setshowRegistForm(true)
        Api.regist({
            messageId: messageId,
            email: email,
            code: valCode,
            nickName: nickName,
            password: password
        }).then(res => {
            message.success("注册成功")
            setshowRegistForm(false)
        })
    }
    const getCode = e => {
        if (!/^\w+@[a-z0-9]+\.[a-z]+$/i.test(email)) return message.warning("请正确填写注册邮箱")
        Api.getMailCode({
            email: email
        }).then(res => {
            setmessageId(res.data.messageId)
            startTiming()
        })
    }

    const layout = e => {
        dispatch({ type: "layout", nickname: "", email: "" })
        setisLogined(false)
        message.success("退出成功")
    }
    const canRegist = e => {
        return Boolean(nickName && email && password && confirmPassword && valCode)
    }

    const canLogin = e => {
        return Boolean(account && pass)
    }

    const startTiming = e => {
        let time = 60
        let t = setInterval(() => {
            if (time > 0) {
                time--
                settimeMsg(`${time}秒后重新获取`)
            } else {
                clearTimeout(t)
                time = 60
                settimeMsg(`重新获取`)
            }
        }, 1000)
    }
    return (
        <div className='user-right-tab'>
            {!isLogined ? (
                <div className='login-before'>
                    <Button className='auto-btn' type='primary' onClick={() => setshowLoginForm(true)}>
                        登录
                    </Button>
                    <Button className='auto-btn' type='' onClick={() => setshowRegistForm(true)}>
                        注册
                    </Button>
                </div>
            ) : (
                <div className='login-after'>
                    <Button type='' block onClick={layout}>
                        退出登录
                    </Button>
                </div>
            )}

            <Modal
                title='登录'
                okText='登录'
                visible={showLoginForm}
                okButtonProps={{ disabled: !canLogin() }}
                onCancel={() => setshowLoginForm(false)}
                onOk={loginSubmit}
            >
                <Form>
                    <Form.Item>
                        <Input
                            placeholder='email'
                            prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />}
                            value={account}
                            onChange={e => setaccount(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder='password'
                            prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
                            type='password'
                            value={pass}
                            onChange={e => setpass(e.target.value)}
                        ></Input>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title='注册'
                okText='注册'
                visible={showRegistForm}
                okButtonProps={{ disabled: !canRegist() }}
                onCancel={() => setshowRegistForm(false)}
                onOk={registSubmit}
            >
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
                                    <Button onClick={getCode} disabled={timeMsg.match(/^\d/g)}>
                                        {timeMsg}
                                    </Button>
                                </div>
                            }
                            value={email}
                            onChange={e => setemail(e.target.value)}
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
                            placeholder='confirm password'
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
