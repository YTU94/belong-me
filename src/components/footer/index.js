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
                    <Button type='link' className='bt' href='https://ytuj.cn'>
                        ytuj.cn
                    </Button>
                </h4>
            </div>
            <div className='bottom-bar'>
                <div className='left'>Copyright © 2019 WebYtu. All rights reserved.</div>

                <div className='right'>
                    <Button type='link' className='bt' href='https://github.com/YTU94/belong-me'>
                        github
                    </Button>
                </div>
            </div>
            <Button type='link' className='beian-bt bt' href='http://www.beian.miit.gov.cn'>
                浙ICP备18054191号
            </Button>
        </footer>
    )
}
