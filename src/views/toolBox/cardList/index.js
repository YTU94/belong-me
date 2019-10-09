import React from "react"
import { Card, Col, Row, Avatar } from "antd"
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"

let id = 0
const { Meta } = Card

function Index(params) {
    return (
        <div className='activitys-list'>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Link to='/toolBox/dataReverse'>
                            <Meta
                                avatar={<Avatar style={{ backgroundColor: "#87d068" }}>ZH</Avatar>}
                                title='进制转换'
                                size='small'
                                description='不同进制之间的转换'
                            />
                        </Link>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Link to='/toolBox/uploadImg'>
                            <Meta
                                avatar={<Avatar style={{ backgroundColor: "#87d068" }}>TC</Avatar>}
                                title='Mini图床'
                                description='个人图片云存储'
                            />
                        </Link>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Index
