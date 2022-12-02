import styled from "styled-components";

export const LoginBoxWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${require('@/assets/img/background-image.png')});
    background-size: cover; 
    
    .login-box {
        width: 400px;
        height: 300px;
        z-index: 1;
        background-color: rgb(242, 247, 251);
        box-shadow: 0 0 18px rgba(0, 0, 0, 0.5);
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .email-box {
        top: 80px;
    }
    .pwd-box {
        top: 150px;
    }
    .email-box,
    .pwd-box {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        height: 50px;
        width: 320px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        transition: all 0.2s;
    }
    .email,
    .pwd {
        height: 100%;
        width: 70px;
        user-select: none;
        background-color: rgb(17, 139, 206);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #fff;
        transition: all 0.2s;
    }
    .input-email,
    .input-pwd {
        width: 250px;
        padding: 0 20px;
        font-size: 16px;
        border: none;
        outline: none;
    }
    .login-btn{
        position: absolute;
        top: 224px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(17, 139, 206);
        color: #fff;
        font-size: 16px;
        user-select: none;
        transition: all 0.2s;

        &:hover{
            background-color: rgb(0, 92, 187);
        }
    }
`