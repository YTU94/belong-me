import React from "react"
import "./App.css"
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"
import { Breadcrumb, Alert } from "antd"
import Home from "./views/home/"
import Apps from "./views/app"
import story from "./views/story"
const breadcrumbNameMap = {
    "/apps": "app",
    "/home": "home",
    "/story": "story",
    "/apps/1": "Application1",
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
        <div className='App'>
            <div className='demo-nav'>
                <Link to='/'>Ytu </Link>|<Link to='/home'> 主页</Link>|<Link to='/story'> 故事</Link>
            </div>
            <Alert style={{ margin: "16px 0" }} message=':---------------->' />
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>

            <Switch>
                <Route path='/story' component={story} />
                <Route path='/home' component={Home} />
                <Route path='' component={Apps} />
            </Switch>
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
