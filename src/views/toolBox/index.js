import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"

import PageFooter from "../../components/pageFooter"
import DataReverse from "./dataReverse"
import CardList from "./cardList"
import UploadImg from "./uploadImg"
import SubmitCommand from './submitCommand'


function Home(params) {
    const [message, setmessage] = useState("")
    const [email, setemail] = useState("")
    const msgChange = e => {
        setmessage(e.target.value)
    }
    const emailChange = e => {
        setemail(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
    }
    const submitMsg = e => {}
    return (
        <div>
            <br />
            <h3>⚙ 工具箱</h3>
            <Switch>
                <Route path='/toolBox/submitCommand' component={SubmitCommand} />
                <Route path='/toolBox/dataReverse' component={DataReverse} />
                <Route path='/toolBox/uploadImg' component={UploadImg} />
                <Route path='/toolBox' component={CardList} />
            </Switch>
            <PageFooter />
        </div>
    )
}

export default Home
