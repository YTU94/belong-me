import React, { useState, useEffect } from "react"
import { Icon, Timeline, Form, Input, Button } from "antd"
import PageFooter from "../../components/pageFooter"

let id = 0

function Home(params) {
    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <div>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
                <Form.Item label='Note'>
                    <Input placeholder="I'm the content is being validated" id='validating' />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type='primary' htmlType='submit'>
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
