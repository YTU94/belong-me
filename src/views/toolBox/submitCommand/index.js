import React from "react"
import { Modal, Button, Card, Avatar, Select } from "antd"
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
        shell: "cd /opt/out/belong-me&rm -rf build&git pull origin master"
    }
]
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.shellForm = React.createRef()
    }

    state = { visible: false, curShell: "" }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = e => {
        this.setState({
            visible: false
        })
        Api.submitShell({
            shell: this.shellForm.current.state.shell,
            password: this.shellForm.current.state.password
        }).then(res => {
            console.log(res)
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false
        })
    }
    selectChange = e => {
        this.shellForm.current.state.shell = e
        this.setState({
            curShell: e
        })
    }

    render() {
        return (
            <div className='submit-command'>
                <Card
                    style={{ width: 300 }}
                    cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
                >
                    <Meta
                        avatar={<Avatar src='https://avatars1.githubusercontent.com/u/19224071?s=460&v=4' />}
                        title='Ytu'
                        description='一枚伪前端工程师'
                    />
                </Card>
                <br />
                <br />
                <div>
                    <Button type='primary' onClick={this.showModal}>
                        Submit Shell
                    </Button>
                    <Modal
                        title='Submit Shell'
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText='submit'
                    >
                        <p>Please enter the shell command and execute password</p>
                        <b>Shell：</b>
                        <Select defaultValue='' onChange={this.selectChange} style={{ width: 160 }}>
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
                        <ShellForm props={this.state.curShell} ref={this.shellForm} />
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Home
