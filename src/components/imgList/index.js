import React, { Component } from "react"
import { Carousel, Modal, Icon } from "antd"
import "./index.css"
export default class index extends Component {
    constructor(props) {
        super(props)
    }

    state = { activeIndex: 0, visible: false }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = e => {
        console.log(e)
        this.setState({
            visible: false
        })
    }

    handleCancel = e => {
        console.log(e)
        this.setState({
            visible: false
        })
    }
    next = e => {
        this.slider.slick.slickNext()
    }
    prev = e => {
        this.slider.slick.slickPrev()
    }

    afterChange = e => {
        this.setState({
            activeIndex: e
        })
    }

    render() {
        return (
            <div className='img-list-modal'>
                <img src={this.props.url} onClick={this.showModal} width={(this.props.width || "120") + "px"} height='auto' alt='' />
                <Modal title='' footer={null} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div className='modal-content'>
                        <Carousel afterChange={this.afterChange} arrows={true} autoplay={false} dots ref={el => (this.slider = el)}>
                            {this.props.urlList.map((e, i) => {
                                return <img key={i} src={e} height='auto' alt='' />
                            })}
                        </Carousel>
                        <div className='options-left' onClick={this.prev}>
                            <Icon type='left' />
                        </div>
                        <div className='options-right' onClick={this.next}>
                            <Icon type='right' />
                        </div>
                        <div className='footer-number'>
                            {this.state.activeIndex + 1} / {this.props.urlList.length}
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
