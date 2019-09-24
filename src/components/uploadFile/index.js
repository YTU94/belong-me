import React, { useState, useEffect } from "react"
import { Icon, Upload, message, Button, Input, Steps } from "antd"
import "./app.less"
import Api from "../../utils/api"
const { Step } = Steps
function UploadFile() {
    const [step, setStep] = useState(0)
    const [isDisabled, setIsDisabled] = useState(true)
    const [curUrl, setCurUrl] = useState("")
    const [password, setPassword] = useState("")
    const passwordChange = e => {
        setStep(1)
        setPassword(e.target.value)
    }
    const submitPwd = e => {
        setStep(2)
        if (!password) {
            message.warning(`请先输入校验密码`)
            return false
        }

        Api.submitShell({ shell: "cd ./", password: password }).then(res => {
            if (res.success) {
                setIsDisabled(false)
            }
        })
    }
    const props = {
        name: "file",
        action: "https://ggapi.ytuj.cn/api/v1/uploadImg",
        headers: {
            authorization: "authorization-text"
        },
        onChange(info) {
            setStep(3)
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`)
                setCurUrl(info.file.response.data.url)
                setIsDisabled(true)
                setStep(0)
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`)
                setIsDisabled(true)
                setStep(0)
            }
        }
    }

    return (
        <div className='upload-file'>
            <div className='left'>
                <Steps direction='vertical' current={step}>
                    <Step title='输入密码' description='This is a description.' />
                    <Step title='校验密码' description='This is a description.' />
                    <Step title='上传图片' description='This is a description.' />
                </Steps>
            </div>
            <div className='right'>
                <Input.Password
                    value={password}
                    onChange={passwordChange.bind(this)}
                    placeholder='Enter password'
                    prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
                />
                <br />
                <br />
                <br />

                <Button onClick={submitPwd.bind(this)} type='primary' block>
                    submit
                </Button>
                <br />
                <br />
                <br />

                <Upload {...props}>
                    <Button disabled={isDisabled}>
                        <Icon type='upload' /> Click to Upload
                    </Button>
                </Upload>
                <div>{curUrl}</div>
            </div>
        </div>
    )
}

export default UploadFile
