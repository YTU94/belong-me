import React, { useState, useEffect } from "react"
import { Icon, Timeline, Form, Input, message, Button, Modal } from "antd"
import PageFooter from "../../components/pageFooter"
import Api from "../../utils/api"

function Index(params) {
    const [showNameForm, setshowNameForm] = useState(false)
    const [showForm, setshowForm] = useState(false)
    const [nickName, setnickName] = useState("")
    const [msg, setmsg] = useState("")
    const [messagelist, setmessageList] = useState(["start"])
    useEffect(() => {
        setmsg("")
    }, [messagelist])

    const nickNameChange = e => {
        setnickName(e.target.value)
    }

    const msgChange = e => {
        setmsg(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
    }
    const submitMsg = e => {
        setmessageList([...messagelist, msg])
    }

    const save = e => {
        setshowNameForm(true)
    }

    const handleOk = e => {
        if (!nickName) return message.warning("请先输入昵称")
        Api.sendMsg({ nickName, msg }).then(res => {
            console.log(res)
        })
    }
    const timeLineData = messagelist.map((e, i) => {
        return (
            <Timeline.Item key={i} dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />}>
                {e}
            </Timeline.Item>
        )
    })
    return (
        <div className='story'>
            <br />
            <h3> 🎓毕业后做的些事</h3>
            <br />
            <Timeline>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />}>
                    博客走走停停的坚持着，只为了有个足迹👣，去走的更好路【ytuj.cn】
                </Timeline.Item>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />}>
                    也搞了自己的微信公众号，然而有时候可能自己都忘了，【疯狂的前端】
                </Timeline.Item>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />} color='red'>
                    小程序的风刮来时，做了2个小程序，凑凑热闹【meedu】【酒桌gaming】
                </Timeline.Item>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />}>
                    最有💰收益的就是在慕课网做了讲师，录了课程
                </Timeline.Item>
                <Timeline.Item dot={<Icon type='clock-circle-o' style={{ fontSize: "16px" }} />}>
                    <div className='a'>路漫漫其修远兮，吾将上下而求索</div>
                </Timeline.Item>
            </Timeline>
            <div className='activitys-list'>
                <h3>
                    life is always unpredictable, 这是我的故事,你的呢，开始回忆你的故事吧{" "}
                    <Button onClick={() => setshowForm(true)}>start</Button>
                </h3>
            </div>
            {showForm ? (
                <Form labelCol={{ span: 2 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
                    <Form.Item label='message'>
                        <Input placeholder='Please input what you want to say' onChange={msgChange} value={msg} id='validating0' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
                        <Button type='primary' htmlType='submit' disabled={!msg} onClick={submitMsg}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                ""
            )}
            {showForm ? (
                <div>
                    <Timeline>{timeLineData}</Timeline>
                    <Button type='primary' style={{ width: "260px" }} disabled={messagelist.length < 2} onClick={save}>
                        保存
                    </Button>
                </div>
            ) : (
                ""
            )}
            <Modal visible={showNameForm} title='输入昵称' onOk={handleOk} onCancel={() => setshowNameForm(false)} okText='提交'>
                <Input placeholder='Please input your nick name' onChange={nickNameChange} value={nickName}></Input>
            </Modal>
            <PageFooter />
        </div>
    )
}

export default Index
