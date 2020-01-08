import React, { useState } from 'react'
import { Button } from 'antd'
import A from '../../components/c/c'

export default function(params) {
    const [show, setshow] = useState(false)
    const [data, setdata] = useState({
        x: 'asdasdas',
        vin: '1231',
        transDemandNo: 1
    })

    const submit = e => {
        // TODO: 判断
        console.log('----->', e)
        if (e) {
            // do submit then close
            setTimeout(() => {
                setshow(false)
            }, 1000)
        }
    }
    const hideModal = e => {
        setshow(false)
    }
    return (
        <div className='target'>
            目标
            <h3>开一个羽毛球场馆</h3>
            理由
            <p className=''>谁还没有一个爱好吗</p>
            <Button
                onClick={() => {
                    setshow(true)
                }}
            >
                {' '}
                发起过去开标{' '}
            </Button>
            <Button
                onClick={() => {
                    setshow(true)
                }}
            >
                {' '}
                变更{' '}
            </Button>
            {/* type 0 发起过去开票 1 变更过户人 */}
            <A name={'asa'} type={1} data={data} visible={show} onSubmit={submit} onHideModal={hideModal}></A>
        </div>
    )
}
