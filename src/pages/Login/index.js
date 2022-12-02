import React, { memo } from 'react'
// 组件
import { LoginWrapper } from './style'
import LoginBox from './components/LoginBox'

const Login = memo(() => {
    return (
        <LoginWrapper>
            <LoginBox />
        </LoginWrapper>
    )
})
export default Login