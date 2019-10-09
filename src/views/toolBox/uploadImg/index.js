import React from "react"
import { Icon, Upload } from "antd"
import UploadFile from "../../../components/uploadFile"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.shellForm = React.createRef()
    }

    state = { visible: false, curShell: "", curUrl: "" }

    render() {
        return (
            <div>
                <br />
                <br />

                <UploadFile></UploadFile>
            </div>
        )
    }
}

export default Home
