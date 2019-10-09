import React, { useState, useEffect } from "react"
import { Icon, Timeline, Form, Input, Button } from "antd"
import PageFooter from "../../components/pageFooter"

let id = 0

function Home(params) {
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
        <div>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
                <Form.Item label='message'>
                    <Input placeholder='Please input what you want to say' onChange={msgChange} value={message} id='validating0' />
                </Form.Item>
                <Form.Item label='email'>
                    <Input placeholder='Please input your email' onChange={emailChange} value={email} id='validating1' />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type='primary' htmlType='submit' onClick={submitMsg}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <h3> 🎓毕业后做的些事</h3>
            <br />
            <Timeline>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />}>博客走走停停的坚持着，只为了有个足迹👣，去走的更好路【ytuj.cn】</Timeline.Item>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />}>也搞了自己的微信公众号，然而有时候可能自己都忘了，【疯狂的前端】</Timeline.Item>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />} color='red'>
                    小程序的风刮来时，做了2个小程序，凑凑热闹【meedu】【酒桌gaming】
                </Timeline.Item>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />}>最有💰收益的就是在慕课网做了讲师，录了课程</Timeline.Item>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />}>
                    <div className="a">路漫漫其修远兮，吾将上下而求索</div>
                </Timeline.Item>

            </Timeline>
            <div className="activitys-list">
                <h3>life</h3>
            </div>
            <PageFooter />
        </div>
    )
}

export default Home
