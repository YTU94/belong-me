import React from "react"
import { Modal, Button, Card, Icon, Avatar } from "antd"
import ShellForm from "../../components/shellForm"
import PageFooter from "../../components/pageFooter"

const { Meta } = Card

class Home extends React.Component {
    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = e => {
        console.log(e)
        this.setState({
            visible: false
        })
    }

    handleCancel = e => {
        console.log(e)
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <div>
                <Card
                    style={{ width: 300 }}
                    cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
                    actions={[
                        <Icon type='setting' key='setting' />,
                        <Icon type='edit' key='edit' />,
                        <Icon type='ellipsis' key='ellipsis' />
                    ]}
                >
                    <Meta
                        avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                        title='Card title'
                        description='This is the description'
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
                        <ShellForm />
                    </Modal>
                </div>

                <PageFooter />
            </div>
        )
    }
}

export default Home
