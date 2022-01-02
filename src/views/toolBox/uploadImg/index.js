import React, { useState, useEffect } from 'react'
import UploadFile from '../../../components/uploadFile'
import Api from '../../../utils/api'
import { Icon, Button } from 'antd'
import './index.less'

function Index(params) {
    const [curRoute, setcurRoute] = useState([])
    const [curPathList, setcurPathList] = useState([])
    const [curImgPath, setcurImgPath] = useState('')

    useEffect(() => {
        Api.getFilePath({}).then(res => {
            setcurPathList(res.data)
        })
        return () => { }
    }, [])

    const openFile = (e, jump = false) => {
        console.log(e, jump)
        const imgTypeList = ['jpg', 'jpeg', 'png']
        let path = ''

        if (!isFolder(e)) {
            let eArr = e.split('.')
            let type = eArr[eArr.length - 1]
            if (imgTypeList.indexOf(type) > -1) {
                curRoute.forEach(i => {
                    path = path + '/' + i
                })
                let p = 'http://assets.ytuj.cn' + path + '/' + e
                setcurImgPath(p)
                return false
            }
        }

        if (jump) {
            if (e === 'root') {
                Api.getFilePath({}).then(res => {
                    setcurPathList(res.data)
                })
            }
            let I = curRoute.indexOf(e)
            for (let i = 0; i < I + 1; i++) {
                path = path + '/' + curRoute[i]
                Api.getFilePath({ path: path }).then(res => {
                    setcurPathList(res.data)
                })
            }
            curRoute.splice(I + 1, curRoute.length - I)
            return false
        }

        isFolder(e) && curRoute.push(e)
        curRoute.forEach(i => {
            path = path + '/' + i
        })

        isFolder(e) &&
            Api.getFilePath({ path: path }).then(res => {
                setcurPathList(res.data)
            })
    }
    const isFolder = e => {
        console.log(typeof e)
        return e.indexOf('.') < 0
    }
    return (
        <div>
            <br />
            <UploadFile></UploadFile>
            <div className=''>
                {curImgPath && <img src={curImgPath} alt='image.png' className='ant-item-image' />}
                <h1>预览 </h1>
                <div className='path-route'>
                    <a onClick={openFile.bind(this, 'root', true)}>Root </a>
                    {curRoute.map((e, i) => {
                        return (
                            <a key={i} onClick={openFile.bind(this, e, true)}>
                                / {e}
                            </a>
                        )
                    })}
                </div>
                {curPathList.map(e => {
                    return (
                        <div className='path-line' onClick={openFile.bind(this, e, false)}>
                            <span className=''>{isFolder(e) ? '文件夹' : '文    件'}：</span>
                            <a>{e}</a>
                            <Icon type='right' />
                        </div>
                    )
                })}
            </div>
            <div className="">
                <Button type='primary'>好用</Button>
                &nbsp;&nbsp;
                <Button type='normal'>男用</Button>
            </div>
        </div>
    )
}
export default Index
