import React, { memo } from 'react'
// 组件
import { ModalTextWrapper } from './style'

const ModalText = memo((props) => {
    const { text, value, handleChange } = props
    return (
        <ModalTextWrapper>
            <p className='value-box'>{text}</p>
            <input
                className="input-box"
                type="text"
                value={value}
                onChange={e => {
                    handleChange(e.target.value);
                }} />
        </ModalTextWrapper>
    )
})

export default ModalText