import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom"

import PageFooter from "../../components/pageFooter"
import DataReverse from "./dataReverse"
import CardList from "./cardList"
import UploadImg from "./uploadImg"
import SubmitCommand from './submitCommand'
import BtcSearch from './btcSearch'

function Home(params) {
    return (
        <div>
            <br />
            <h3>⚙ 工具箱</h3>
            <Switch>
                <Route path='/toolBox/submitCommand' component={SubmitCommand} />
                <Route path='/toolBox/dataReverse' component={DataReverse} />
                <Route path='/toolBox/uploadImg' component={UploadImg} />
                <Route path='/toolBox/btcSearch' component={BtcSearch} />
                <Route path='/toolBox' component={CardList} />
            </Switch>
            <PageFooter />
        </div>
    )
}

export default Home
