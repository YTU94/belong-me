import React from "react"
import "./App.less"
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"
import Blog from "./views/blog"
import F2e from "./views/f2e"
import Home from "./views/home"
import Footer from "./components/footer"

const list = [
    { path: "/", component: Home, name: "首页" },
    { path: "/blog", component: Blog, name: "博客" },
    { path: "/f2e", component: F2e, name: "前端之道" }
]

const Homes = withRouter(props => {
    return (
        <div className='root-app'>
            <header className='header'>
                <div className='bottom-bar'>
                    <div className='left'>YTU-94</div>
                    <div className='right'>
                        {list.map(e => {
                            return (
                                <Link key={e.name} to={e.path}>
                                    {e.name}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </header>

            <Switch>
                <Route path='/blog' component={Blog} />
                <Route path='/f2e' component={F2e} />
                <Route path='/' component={Home} />
            </Switch>

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
