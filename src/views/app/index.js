import React from "react"
import { Link } from "react-router-dom"
import { Button } from "antd"
import "./app.less"

function Home() {
    return (
        <div className='app'>
            <header className='App-header'>
                <Button type='primary'>Primary</Button>
                <div>
                    <p>page 1</p>
                    <ul className='app-list'>
                        <li>
                            <Link to='/apps/1'>Application1</Link>：<Link to='/apps/1/detail'>Detail</Link>
                        </li>
                        <li>
                            <Link to='/apps/2'>Application2</Link>：<Link to='/apps/2/detail'>Detail</Link>
                        </li>
                        <li>
                            <Link to='/apps/2'>Application2</Link>：<Link to='/apps/2/detail'>Detail</Link>
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Home
