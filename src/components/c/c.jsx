import React from "react"
import ReactDom from "react-dom"
import { Form, Input, Select, message, Modal, Cascader, Button, AutoComplete } from "antd"
import options from "./cascader-address-options"
import "./index.css"

const { Option } = Select

// transferTypeCode 枚举
const TRANSFER_THIRD_PERSON = 1
const TRANSFER_THIRD_COMPANY = 0

const INITIATE_TRANSFER = 0
const UPDATE_TRANSFER = 1
// 指标城市code
const LIMIT_LICENSE = ["1101"]

/*
 * params
 * type (props Number) 表单类型
 * data (props Object) 表单域所有数据
 * visible (props Boolean) 控制弹框显藏
 * onSubmit (props function) 确认提交后的回调
 * onHideModal (props function) 隐藏modal组件
 */
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showResidencePermit: false, // 居住证
            showIndexBook: false, // 指标书
            // vin: "",
            // transferTypeCode: "",
            // transPersonName: "",
            // transPersonIdCard: "",
            // transPersonPhone: "",
            // provinceCode: "",
            // provinceName: "",
            // cityCode: "",
            // cityName: "",
            // addressDetail: "",
            // email: "",
            // residencePermitUrl: "",
            // quotaDocumentUrl: "",
            // idCardFrontUrl: "",
            // idCardBackUrl: "",

            // companyName: "",
            // taxNumber: "",
            // contact: "",
            // transCityCode: "",
            // transCityName: "",
            // businessLicenseUrl: "",

            companyTransferCity: [],
            householdCity: [],
            personTansferCity: [],
            autoCompleteResult: [],
            oldTransferList: [
                { name: "原过户人姓名", key: "oldTransPersonName", value: "" },
                { name: "原过户人手机号", key: "oldTransPersonPhone", value: "" },
                { name: "原过户人身份证", key: "oldTransPersonIdCard", value: "" }
            ]
        }
    }

    componentDidMount() {
        // WARN: 不支持多层数据
        let data = {}
        Object.assign(data, this.props.data)
        this.setState({
            vin: data.vin || "",
            transferTypeCode: data.transferTypeCode || TRANSFER_THIRD_PERSON,
            transPersonName: data.transPersonName || "",
            transPersonIdCard: data.transPersonIdCard || "",
            transPersonPhone: data.transPersonPhone || "",
            provinceCode: data.provinceCode || "",
            provinceName: data.provinceName || "",
            cityCode: data.cityCode || "",
            cityName: data.cityName || "",
            addressDetail: data.addressDetail || "",
            email: data.email || "",
            residencePermitUrl: data.residencePermitUrl || "",
            quotaDocumentUrl: data.quotaDocumentUrl || "",
            idCardFrontUrl: data.idCardFrontUrl || "",
            idCardBackUrl: data.idCardBackUrl || "",

            companyName: data.companyName || "",
            taxNumber: data.taxNumber || "",
            contact: data.contact || "",
            transCityCode: data.transCityCode || "",
            transCityName: data.transCityName || "",
            businessLicenseUrl: data.businessLicenseUrl || ""
        })
    }

    handleOk = v => {
        let data = v
        let checkResult = this.extraCheck()
        if (checkResult.validate) {
            Object.assign(data, { ...checkResult.data })
            this.props.onSubmit({ ...data })
        } else {
            message.warn(checkResult.errMsg || "未知错误")
        }
    }

    // 额外数据校验
    extraCheck = () => {
        let result = {
            validate: true,
            errMsg: "",
            data: {}
        }
        if (this.state.transferTypeCode === TRANSFER_THIRD_PERSON) {
            if (!this.state.provinceCode) {
                result.validate = false
                result.errMsg = "请填写户籍地城市"
            } else {
                result.data.provinceCode = this.state.provinceCode
                result.data.provinceName = this.state.provinceName
            }

            if (!this.state.cityCode) {
                result.validate = false
                result.errMsg = "请填写户籍地城市"
            } else {
                result.data.cityCode = this.state.cityCode
                result.data.cityName = this.state.cityName
            }
            const keyArr = [
                {
                    key: "idCardFrontUrl",
                    msg: "请上传身份证正面"
                },
                {
                    key: "idCardBackUrl",
                    msg: "请上传身份证反面"
                }
            ]
            if (this.state.showIndexBook) {
                keyArr.push({ key: "quotaDocumentUrl", msg: "请上传指标数" })
            }
            if (this.state.showResidencePermit) {
                keyArr.push({ key: "residencePermitUrl", msg: "请上传居住证" })
            }
            keyArr.forEach(e => {
                if (!this.state[e.key]) {
                    result.validate = false
                    result.errMsg = e.msg
                } else {
                    result.data[e.key] = this.state[e.key]
                }
            })
        } else {
            if (!this.state.businessLicenseUrl) {
                result.validate = false
                result.errMsg = "请上传营业执照"
            } else {
                // TODO: 补充图片地址
                result.data.businessLicenseUrl = this.state.businessLicenseUrl
            }
        }
        // common
        if (!this.state.transCityCode) {
            result.validate = false
            result.errMsg = "请填写过户城市"
        } else {
            result.data.transCityCode = this.state.transCityCode
            result.data.transCityName = this.state.transCityName
        }

        return result
    }

    handleCancel = e => {
        this.props.onHideModal(false)
    }
    handleChange = e => {}
    getOCRData = e => {
        this.setState({
            // transPersonName: "123",
            // transPersonIdCard: "11231",
            // addressDetail: "1231231",
            householdCity: ["11", "1101"],
            provinceName: "北京",
            provinceCode: "11",
            cityCode: "1101",
            cityName: "区域"
        })
        this.props.form.setFieldsValue({
            transPersonName: "123",
            transPersonIdCard: "11231",
            addressDetail: "1231231"
        })
    }
    handleSubmit = e => {
        const fieldNames =
            this.state.transferTypeCode === TRANSFER_THIRD_COMPANY
                ? ["companyName", "taxNumber", "contact"]
                : ["transPersonName", "transPersonIdCard", "transPersonPhone", "addressDetail", "email"]
        this.props.form.validateFields(fieldNames, (err, values) => {
            if (!err) {
                this.handleOk(values)
            } else {
                console.log("Received err of form: ", err)
            }
        })
    }
    handleSelectCity = (key = "", v, selectedOptions) => {
        let data = {}
        data[key] = v
        this.setState(data, () => {
            this.handleMiddleData(key, v, selectedOptions)
            this.checkShowResidencePermit(key)
        })
    }
    handleMiddleData(key, v, selectedOptions) {
        const enumerate = [
            { key: "companyTransferCity", cityName: "transCityName", cityCode: "transCityCode" },
            // { key: "householdCity", provinceName: "provinceName", provinceCode: "provinceCode", cityName: "cityName", cityCode: "cityCode" },
            { key: "personTansferCity", cityName: "transCityName", cityCode: "transCityCode" }
        ]
        const tar = enumerate.filter(e => e.key === key)
        const data = {
            [tar[0].cityName]: selectedOptions[1].label,
            [tar[0].cityCode]: selectedOptions[1].value
        }
        tar.length &&
            this.setState(data, () => {
                console.log(this.state.transCityCode, this.state.transCityName)
            })
    }
    checkShowResidencePermit(key) {
        if (key === "companyTransferCity") return
        let tar1 = this.state.personTansferCity[1]
        let tar2 = this.state.householdCity[1]
        this.setState({
            showResidencePermit: tar1 === tar2 && tar1 !== undefined
        })

        this.setState({
            showIndexBook: LIMIT_LICENSE.indexOf(tar1) > -1
        })
    }
    // 初始化原过户人信息
    initOldTransferInfo = e => {
        this.state.oldTransferList.forEach(item => {
            for (const key in item) {
                key === "key" && (item.value = e[item.key])
            }
        })
    }
    // TODO: 图片上传 待修改
    uploadBusinessLicenseUrl = e => {
        this.setState({
            businessLicenseUrl: "http"
        })
    }
    uploadIdCardFrontUrl = e => {
        this.getOCRData()

        this.setState({
            idCardFrontUrl: "http"
        })
    }
    uploadIdCardBackUrl = e => {
        this.setState({
            idCardBackUrl: "http"
        })
    }
    uploadResidencePermitUrl = e => {
        this.setState({
            residencePermitUrl: "http"
        })
    }
    uploadQuotaDocumentUrl = e => {
        this.setState({
            quotaDocumentUrl: "http"
        })
    }
    render() {
        const citys = options
        const { visible } = this.props
        const { vin } = this.state
        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: {
                xs: { span: 26 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        }

        const oldTransferInfo = (
            <div className='old-transfer'>
                {this.state.oldTransferList.map(e => {
                    return (
                        <div className='old-transfer-item' key={e.name}>
                            {e.name}: {e.value}
                        </div>
                    )
                })}
            </div>
        )

        const companyForm = (
            <section>
                <div>营业执照</div>
                <Button onClick={this.uploadBusinessLicenseUrl}> 上传照片</Button>

                <Form.Item label='公司名称'>
                    {getFieldDecorator("companyName", {
                        rules: [
                            {
                                required: true,
                                message: "请输入必填项！"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='公司税号'>
                    {getFieldDecorator("taxNumber", {
                        rules: [
                            {
                                required: true,
                                message: "请输入必填项！"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='联系方式'>
                    {getFieldDecorator("contact", {
                        rules: [
                            {
                                required: true,
                                message: "请输入必填项！"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='过户城市'>
                    <Cascader value={this.state.companyTransferCity} options={citys} onChange={this.handleSelectCity.bind(this, "companyTransferCity")} />
                </Form.Item>
            </section>
        )
        const personForm = (
            <section>
                <div className='info-img-box'>
                    <div className='img-item'>
                        <div className='item-title'>身份证正面</div>
                        <div className='item-img'>
                            <Button onClick={this.uploadIdCardFrontUrl}> 上传照片</Button>
                        </div>
                    </div>

                    <div className='img-item'>
                        <div className='item-title'>身份证反面</div>
                        <div className='item-img'>
                            <Button onClick={this.uploadIdCardBackUrl}> 上传照片</Button>
                        </div>
                    </div>
                </div>
                <Form.Item label='姓名'>
                    {getFieldDecorator("transPersonName", {
                        rules: [
                            {
                                required: true,
                                message: "请输入必填项！"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='身份证号'>
                    {getFieldDecorator("transPersonIdCard", {
                        rules: [
                            {
                                required: true,
                                message: "请输入必填项！"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='身份证地址'>
                    {getFieldDecorator("addressDetail", {
                        rules: [
                            {
                                required: true,
                                message: "请输入必填项！"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='户籍地省市'>
                    <Cascader disabled value={this.state.householdCity} options={citys} onChange={this.handleSelectCity.bind(this, "householdCity")} />
                </Form.Item>
                <Form.Item label='过户城市'>
                    <Cascader value={this.state.personTansferCity} options={citys} onChange={this.handleSelectCity.bind(this, "personTansferCity")} />
                </Form.Item>
                <div className='info-img-box'>
                    {this.state.showResidencePermit && (
                        <div className='img-item'>
                            <div className='item-title'>居住证</div>
                            <div className='item-img'>
                                <Button onClick={this.uploadResidencePermitUrl}> 上传照片</Button>
                            </div>
                        </div>
                    )}

                    {this.state.showIndexBook && (
                        <div className='img-item'>
                            <div className='item-title'>上传指标数</div>
                            <div className='item-img'>
                                <Button onClick={this.uploadQuotaDocumentUrl}> 上传照片</Button>
                            </div>
                        </div>
                    )}
                </div>

                <Form.Item label='过户人手机号'>
                    {getFieldDecorator("transPersonPhone", {
                        rules: [
                            {
                                required: true,
                                message: "请输入必填项！"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='邮箱'>
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                required: true,
                                message: "请输入必填项！"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
            </section>
        )

        return (
            <div className='a'>
                <Modal title={this.props.title} footer={null} maskClosable={false} visible={visible} onCancel={this.handleCancel}>
                    <div className='msg-line'>VIN:&nbsp;{vin}</div>
                    {this.props.type === UPDATE_TRANSFER && oldTransferInfo}
                    <div className='msg-line'>
                        过户对象:&nbsp;
                        <Select
                            defaultValue={TRANSFER_THIRD_PERSON}
                            style={{ width: 140 }}
                            onChange={e =>
                                this.setState({
                                    transferTypeCode: e
                                })
                            }
                        >
                            <Option value={TRANSFER_THIRD_PERSON}>第三方-个人</Option>
                            <Option value={TRANSFER_THIRD_COMPANY}>第三方-公司</Option>
                        </Select>
                    </div>
                    <div className='line-title'>过户开票信息</div>
                    <div className='transfer-info'>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            {this.state.transferTypeCode === TRANSFER_THIRD_COMPANY ? companyForm : personForm}
                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                <Button type='' onClick={this.handleCancel}>
                                    取消
                                </Button>
                                &nbsp;&nbsp;
                                <Button type='primary' htmlType='submit'>
                                    确认
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

const A = Form.create()(Home)
ReactDom.render(<A />, document.getElementById("root"))

export default A
