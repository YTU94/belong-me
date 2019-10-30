import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"

import "./index.less"

export default function Index(params) {
    const [path, setpaht] = useState("")
    
    return (
        <header className='header'>
            <div className='bottom-bar'>
                <div className='left'>YTU94</div>
                <div className='right'>
                    <Link to={path}>首页</Link>
                    <Link to={path}>博客</Link>
                    <Link to={path}>github</Link>
                </div>
            </div>
        </header>
    )
}
