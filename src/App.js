import React from "react"
import "./App.less"
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"
import Price from "./views/price"

import Footer from "./components/footer"
import Header from "./components/header"
import Home from "./views/home"


const Homes = withRouter(props => {

    return (
        <div className='root-app'>
            <Header></Header>

            <Switch>
                <Route path='/price' component={Price} />
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
