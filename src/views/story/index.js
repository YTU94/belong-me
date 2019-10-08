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

            <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />} color='red'>
                    Technical testing 2015-09-01
                </Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
            <br />
            <br />

            <PageFooter />
        </div>
    )
}

export default Home
