import React from "react"
import { Card, Col, Row, Avatar } from "antd"
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"
import "./index.less"

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
        },
        {
            path: "/toolBox/btcSearch",
            avatarText: "BS",
            title: "比特币查询",
            description: "比特币查询",
            backgroundColor: "#87d068"
        },
        {
            path: "/toolBox/",
            avatarText: "WL",
            title: "下一个，你来定",
            description: "下方邮件私信我👇",
            backgroundColor: "rgb(86, 162, 248)"
        }
    ]
    return (
        <div className='card-list'>
            <Row gutter={[16, 16]}>
                {cardList.map(e => (
                    <Col xs={24} md={8}>
                        <Card>
                            <Link className='list-card' to={e.path}>
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
