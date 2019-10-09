import React from "react"
import { Card, Col, Row, Avatar } from "antd"
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"

let id = 0
const { Meta } = Card

function Index(params) {
    const cardList = [
        {
            path: "/toolBox/dataReverse",
            avatarText: "ZH",
            title: "进制转换",
            description: "进制转换",
            backgroundColor: "#87d068"
        },
        {
            path: "/toolBox/uploadImg",
            avatarText: "TC",
            title: "Mini图床",
            description: "个人图片云存储",
            backgroundColor: "#87d068"
        },
        {
            path: "/toolBox/submitCommand",
            avatarText: "SC",
            title: "提交终端命令",
            description: "提交终端命令",
            backgroundColor: "#87d068"
        }
    ]
    return (
        <div className='activitys-list'>
            <Row gutter={16}>
                {cardList.map(e => (
                    <Col span={8}>
                        <Card>
                            <Link to={e.path}>
                                <Meta
                                    avatar={<Avatar style={{ backgroundColor: e.backgroundColor }}>{e.avatarText}</Avatar>}
                                    title={e.title}
                                    size='small'
                                    description={e.description}
                                />
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Index
