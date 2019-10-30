import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"

import "./index.less"

export default function Index(params) {
    const [path, setpaht] = useState("")
    const list = [{ path: "/", name: "首页" }, { path: "/price", name: "博客" }]
    return (
        <header className='header'>
            <div className='bottom-bar'>
                <div className='left'>YTU94</div>
                <div className='right'>
                    {list.map(e => {
                        return <Link to={e.path}>{e.name}</Link>
                    })}
                </div>
            </div>
        </header>
    )
}
