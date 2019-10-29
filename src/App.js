import React from "react"
import "./App.less"
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"
import { Breadcrumb, Alert, Col, Row } from "antd"
import Apps from "./views/app"
import Price from "./views/price"

import story from "./views/story"
import toolBox from "./views/toolBox"
import SideBar from "./views/sideBar"
import Footer from "./components/footer"

const breadcrumbNameMap = {
    "/apps": "app",
    "/price": "price",
    "/story": "story",
    "/uploadImg": "uploadImg",
    "/toolBox": "toolBox",

    "/toolBox/dataReverse": "dataReverse",
    "/toolBox/uploadImg": "uploadImg",
    "/toolBox/submitCommand": "submitCommand",

    "/apps/2": "Application2",
    "/apps/1/detail": "Detail",
    "/apps/2/detail": "Detail"
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
        <div className='root-app'>
            <div className='container'>
                <Row gutter={40}>
                    <Col span={19} className='white-bg box-shadow'>
                        <div className='demo-nav'>
                            <Link to='/'>Ytu&nbsp;</Link>|<Link to='/story'>&nbsp;故事&nbsp;</Link>|
                            <Link to='/toolBox'>&nbsp;工具箱&nbsp;</Link>|<Link to='/price'>&nbsp;收益&nbsp;</Link>
                        </div>
                        <Alert style={{ margin: "16px 0" }} message=':---------------->' />
                        <Breadcrumb>{breadcrumbItems}</Breadcrumb>

                        <Switch>
                            <Route path='/toolBox' component={toolBox} />
                            <Route path='/story' component={story} />
                            <Route path='/price' component={Price} />
                            <Route path='' component={Apps} />
                        </Switch>
                    </Col>
                    <Col span={5}>
                        <SideBar />
                    </Col>
                </Row>
            </div>

            <Footer />
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
