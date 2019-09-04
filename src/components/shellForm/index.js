import React from "react"
import "./app.less"

import { Icon, Input } from "antd"

class ShellForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shell: "",
            password: ""
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values)
            }
        })
    }

    shellChange = e => {
        console.log(this.props)
        this.setState({
            shell: e.currentTarget.value
        })
    }

    passwordChange = e => {
        this.setState({
            password: e.currentTarget.value
        })
    }

    render() {
        return (
            <div className=''>
                <Input
                    value={this.state.shell}
                    onChange={this.shellChange}
                    placeholder='Enter Shell'
                    prefix={<Icon type='file-text' style={{ color: "rgba(0,0,0,.25)" }} />}
                />
                <br />
                <br />
                <Input.Password
                    value={this.state.password}
                    onChange={this.passwordChange}
                    placeholder='Enter password'
                    prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
                />
                <br />
                <br />
            </div>
        )
    }
}

export default ShellForm
