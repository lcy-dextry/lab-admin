import React, { memo, useState } from 'react'
import { connect } from 'react-redux';
// 组件
import { notification } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { LoginBoxWrapper } from './style'
// 数据
import { auth } from '@/utils/cloudBase';
import { login } from '@/redux/actions';

const LoginBox = memo(props => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    // 提示消息的函数
    const openLoginNoti = state => {
        const message = state ? '登录成功' : '登录失败';
        const description = state
            ? '欢迎进入后台管理系统！'
            : '用户名或密码不正确，请重新登录！';
        const icon = state ? (
            <CheckOutlined style={{ color: 'blue' }} />
        ) : (
            <CloseOutlined style={{ color: 'red' }} />
        );
        notification.open({
            message,
            description,
            icon,
            placement: 'bottomLeft',
            duration: 1.5
        });
    };
    // 登录
    const login = () => {
        auth
            .signInWithEmailAndPassword(email, pwd)
            .then(() => {
                // 登录成功
                props.login(true);
                openLoginNoti(true);
            })
            .catch(() => {
                // 登录失败
                props.login(false);
                openLoginNoti(false);
            });
    };

    return (
        <LoginBoxWrapper>
            <div className='login-box'>
                <div className='email-box'>
                    <div className='email'>邮箱</div>
                    <input
                        type='text'
                        className='input-email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='pwd-box'>
                    <div className='pwd'>密码</div>
                    <input
                        type='password'
                        className='input-pwd'
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                    />
                </div>
                <div className='login-btn' onClick={() => login(false)}>
                    登录
                </div>
            </div>
        </LoginBoxWrapper>
    )
})
export default connect(() => ({}), { login })(LoginBox);
