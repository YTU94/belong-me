import React from "react"
import "./index.less"
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"
import { Breadcrumb, Alert, Col, Row } from "antd"
import Apps from "../app"
import story from "../story"
import target from "../target"
import toolBox from "../toolBox"
import SideBar from "../sideBar"

const breadcrumbNameMap = {
    "/apps": "app",
    "/story": "story",
    "/target": "target",

    "/uploadImg": "uploadImg",
    "/toolBox": "toolBox",

    "/toolBox/dataReverse": "dataReverse",
    "/toolBox/uploadImg": "uploadImg",
    "/toolBox/btcSearch": "btcSearch",
    "/toolBox/submitCommand": "submitCommand"
}

const Homes = withRouter(props => {
    const { location } = props
    const pathSnippets = location.pathname.split("/").filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        )
    })
    const breadcrumbItems = [
        <Breadcrumb.Item key='home'>
            <Link to='/'>Home</Link>
        </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems)

    return (
        <div className='container'>
            <Row gutter={40}>
                <Col xs={24} md={19} className='white-bg box-shadow'>
                    <div className='demo-nav'>
                        <Link to='/'>Ytu&nbsp;</Link>|<Link to='/story'>&nbsp;故事&nbsp;</Link>|
                        <Link to='/toolBox'>&nbsp;工具箱&nbsp;</Link>|<Link to='/target'>&nbsp;目标&nbsp;</Link>
                    </div>
                    <Alert style={{ margin: "16px 0" }} message=':---------------->' />
                    <Breadcrumb>{breadcrumbItems}</Breadcrumb>

                    <Switch>
                        <Route path='/toolBox' component={toolBox} />
                        <Route path='/story' component={story} />
                        <Route path='/target' component={target} />
                        <Route path='' component={Apps} />
                    </Switch>
                </Col>
                <Col xs={24} md={5}>
                    <SideBar />
                </Col>
            </Row>
        </div>
    )
})

function App() {
    return (
        <Router>
            <Homes />
        </Router>
    )
}

export default App
