import React, { useState } from 'react'
import { Button } from 'antd'

export default function (params) {
    const [show, setshow] = useState(false)
    const [data, setdata] = useState({
        x: 'asdasdas',
        vin: '1231',
        transDemandNo: 1
    })

    const submit = (e) => {
        // TODO: 判断
        console.log('----->', e)
        if (e) {
            // do submit then close
            setTimeout(() => {
                setshow(false)
            }, 1000)
        }
    }
    const hideModal = (e) => {
        setshow(false)
    }
    return <div className='target'></div>
}
