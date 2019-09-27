import React from "react"
import { Icon, Upload } from "antd"
import PageFooter from "../../components/pageFooter"
import UploadFile from "../../components/uploadFile"

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
                <PageFooter />
            </div>
        )
    }
}

export default Home
