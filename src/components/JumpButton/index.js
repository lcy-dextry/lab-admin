import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
// 组件
import { ButtonWrapper } from './style';

const JumpButton = memo((props) => {
    const { url, text } = props;
    const navigate = useNavigate();
    const handleClick = () => navigate(url);

    return (
        <ButtonWrapper>
            <button className='btn-2' onClick={handleClick}>{text}</button>
        </ButtonWrapper>
    )
})
export default JumpButton;

