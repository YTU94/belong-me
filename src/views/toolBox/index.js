import React, { useState, useEffect } from "react"
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"

import { Icon, Timeline, Form, Input, Button, Card, Avatar } from "antd"
import PageFooter from "../../components/pageFooter"
import DataReverse from "./dataReverse"
import CardList from "./cardList"
import UploadImg from "./uploadImg"

let id = 0
const { Meta } = Card

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
            <Switch>
                <Route path='/toolBox/dataReverse' component={DataReverse} />
                <Route path='/toolBox/uploadImg' component={UploadImg} />
                <Route path='/toolBox' component={CardList} />
            </Switch>
            <PageFooter />
        </div>
    )
}

export default Home
