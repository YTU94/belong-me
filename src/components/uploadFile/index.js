import React, { useState, useEffect } from "react"
import { Icon, Upload, message, Button } from "antd"
import "./app.less"

function UploadFile() {
    const [curUrl, setCurUrl] = useState("")
    const props = {
        name: "file",
        action: "https://ggapi.ytuj.cn/api/v1/uploadImg",
        headers: {
            authorization: "authorization-text"
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`)
                console.log(info.file.response.data.url)
                setCurUrl(info.file.response.data.url)
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`)
            }
        }
    }

    return (
        <div className='page-footer'>
            <Upload {...props}>
                <Button>
                    <Icon type='upload' /> Click to Upload
                </Button>
            </Upload>

            <div>{curUrl}</div>
        </div>
    )
}

export default UploadFile
