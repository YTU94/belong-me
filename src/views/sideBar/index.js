import React from "react"
import "./index.less"
import { Avatar, Icon, Button, message } from "antd"
import UserMsg from "../../components/userMsg"

function Index(params) {
    const checkIn = e => {
        message.success("签到成功")
    }
    return (
        <div className='side-bar'>
            <div className='top-card'>
                <h2 className='text-align-center'>
                    林逸 —— <Avatar style={{ backgroundColor: "#87d068" }}>YTU</Avatar>
                </h2>
                <br />
                <div className='text-introduction'>
                    <Icon type='github' />
                    &nbsp;&nbsp;
                    <a href='https://github.com/YTU94'>github</a>
                </div>
                <div className='text-introduction'>
                    <Icon type='global' />
                    &nbsp;&nbsp;
                    <a href='https://github.com/YTU94'>Blog</a>
                </div>
                <div className='text-introduction'>
                    <Icon type='mail' />
                    &nbsp;&nbsp;
                    <a href=''>453980450@qq.com</a>
                </div>
                <div className='text-introduction'>LIVE：且随疾风前行</div>
            </div>

            <br />
            <div className='list-card'>
                <Button className='sign-btn' block onClick={checkIn}>
                    签到
                </Button>
                &nbsp;
                <UserMsg></UserMsg>
            </div>
        </div>
    )
}
export default Index
