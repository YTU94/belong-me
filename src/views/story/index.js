import React from "react"
import { Icon, Timeline, Upload } from "antd"
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

                <UploadFile></UploadFile>
                <PageFooter />
            </div>
        )
    }
}

export default Home
