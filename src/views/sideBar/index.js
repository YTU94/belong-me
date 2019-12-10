import React, { useReducer } from "react"
import { useSelector } from "react-redux"
import "./index.less"
import { Avatar, Icon, Button, message } from "antd"
import UserMsg from "../../components/userMsg"
import { reducer, myContext } from "../../reducer"
function Index(params) {
    const checkIn = e => {
        message.success("签到成功")
    }
    const [state, dispatch] = useReducer(reducer, { nickname: "", email: "" })
    const userInfo = useSelector(state => state.userInfo)

    return (
        <div className='side-bar'>
            <div className='top-card'>
                <h2 className='text-align-center'>
                    {userInfo.nickname || "user"} —— <Avatar style={{ backgroundColor: "#87d068" }}>YTU</Avatar>
                </h2>
                <br />
                <div className='text-introduction'>
                    <Icon type='github' />
                    &nbsp;&nbsp;
                    <a href='https://github.com/YTU94'>github</a>
                </div>
                <div className='text-introduction'>
                    <Icon type='global' />
                    &nbsp;&nbsp;
                    <a href='https://github.com/YTU94'>Blog</a>
                </div>
                <div className='text-introduction'>
                    <Icon type='mail' />
                    &nbsp;&nbsp;
                    <a href=''>{userInfo.email || "- -"}</a>
                </div>
                <div className='text-introduction'>LIVE：且随疾风前行</div>
            </div>

            <br />
            <div className='list-card'>
                <section>
                    <Button className='sign-btn' block onClick={checkIn}>
                        签到
                    </Button>
                </section>
                <myContext.Provider value={{ state, dispatch }}>
                    <UserMsg></UserMsg>
                </myContext.Provider>
            </div>
        </div>
    )
}
export default Index
