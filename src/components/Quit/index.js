import React, { memo } from 'react'
import { connect } from 'react-redux';
// 组件
import { QuitWrapper } from './style'
import { LoginOutlined, EnterOutlined } from '@ant-design/icons';
import { notification, Popconfirm } from 'antd';
// 数据
import { login } from '@/redux/actions';

const Quit = memo((props) => {
    const openLogout = () => {
        notification.open({
            message: '已退出',
            icon: <EnterOutlined style={{ color: 'blue' }} />,
            placement: 'bottomLeft',
            duration: 1.5,
        });
    };
    const turnLogout = () => {
        localStorage.clear();
        props.login(false);
        openLogout();
    };
    return (
        <QuitWrapper>
            <div className="quit-part">
                <Popconfirm
                    className="quit-btn"
                    placement="bottomRight"
                    title="是否退出登录？"
                    onConfirm={turnLogout}
                    okText="Yes"
                    cancelText="No"
                >
                    <LoginOutlined />
                </Popconfirm>
            </div>
        </QuitWrapper>
    )
})
export default connect(() => ({}), { login })(Quit);
