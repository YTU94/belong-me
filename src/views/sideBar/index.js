import React from "react"
import "./index.less"
import { Avatar, Icon, Button } from "antd"

function Index(params) {
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
                <Button block>签到</Button>
            </div>
        </div>
    )
}
export default Index
