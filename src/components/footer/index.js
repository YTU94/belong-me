import React from "react"
import "./index.less"
import { Button } from "antd"

export default function Index(params) {
    return (
        <footer className='footer'>
            <h3>The story has not yet begun</h3>
            <div className='content'>
                <h4>
                    Blog:
                    <Button type='link' style={{ color: "gray" }} href='https://ytuj.cn'>
                        ytuj.cn
                    </Button>
                </h4>
            </div>
            <div className='bottom-bar'>
                <div className='left'>Copyright © 2019 WebYtu. All rights reserved.</div>
                <div className='right'>
                    <Button type='link' style={{ color: "#a59f9f" }} href='https://github.com/YTU94/belong-me'>
                        github
                    </Button>
                </div>
            </div>
        </footer>
    )
}
