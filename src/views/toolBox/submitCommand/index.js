import React, { useState } from "react"
import { Modal, Button, Card, Avatar, Select, message } from "antd"
import ShellForm from "../../../components/shellForm"
import Api from "../../../utils/api"
import "./index.less"

const { Meta } = Card
const { Option } = Select

const shellList = [
    {
        key: 0,
        name: "更新taro-back",
        shell: "cd /www/node/taro-GGameing-server & git pull origin master & pm2 restart "
    },
    {
        key: 1,
        name: "更新meedu-back",
        shell: "cd /www/node/back-end && git pull origin master && pm2 start bin/www"
    },
    {
        key: 2,
        name: "自我更新",
        shell: "cd /www/wwwroot/belong-me/ && git pull origin master && npm run build"
    }
]

function Index(params) {
    const [visible, setvisible] = useState(false)
    const [curShell, setcurShell] = useState("")
    const [value, setvalue] = useState("")
    const shellForm = React.createRef()
    const showModal = () => {
        setvisible(true)
    }

    const handleOk = e => {
        setvisible(false)

        Api.submitShell({
            shell: shellForm.current.state.shell,
            password: shellForm.current.state.password
        })
            .then(res => {
                message.info(res.msg)
                setvalue(res.data.stdout)
            })
            .catch(err => {
                setvalue("")
            })
    }

    const handleCancel = e => {
        setvisible(false)
    }

    const selectChange = e => {
        shellForm.current.state.shell = e
        setcurShell(e)
    }

    return (
        <div className='submit-command'>
            <Card
                style={{ width: 300 }}
                cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
            >
                <Meta
                    avatar={<Avatar src='https://avatars1.githubusercontent.com/u/19224071?s=460&v=4' />}
                    title='Ytu'
                    description='一枚渣渣前端工程师'
                />
            </Card>
            <br />
            <br />
            <div>
                <Button type='primary' onClick={showModal}>
                    Submit Shell
                </Button>
                <textarea className='textarea' placeholder='...' name='' id='' cols='30' rows='10' value={value}></textarea>
                <Modal title='Submit Shell' visible={visible} onOk={handleOk} onCancel={handleCancel} okText='submit'>
                    <p>Please enter the shell command and execute password</p>
                    <b>Shell：</b>
                    <Select defaultValue='' onChange={selectChange} style={{ width: 160 }}>
                        {shellList.map(e => {
                            return (
                                <Option value={e.shell} key={e.key}>
                                    {e.name}
                                </Option>
                            )
                        })}
                    </Select>
                    <br />
                    <br />
                    <ShellForm props={curShell} ref={shellForm} />
                </Modal>
            </div>
        </div>
    )
}

export default Index
