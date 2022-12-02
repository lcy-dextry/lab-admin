import styled from "styled-components";

export const ModifyActivityWrapper = styled.div`
    .title-part {
        height: 58px;
        background-color: #b9dfff;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title-input{
            margin-left: 10px;
            width: 1000px;
            height: 40px;
            padding: 0 20px;
            font-size: 20px;
            background-color: #fff;
            border: none;
            outline: none;
            transition: all 0.3s;

            &:hover{
                box-shadow: 0 0 8px #1890ff;
            }
        }
        .pub-btn{
            margin-right: 10px;
            height: 40px;
            width: 86px;
            background-color: #1890ff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            user-select: none;
            transition: all 0.2s;
            color: #fff;

            &:hover{
                background-color: #40a9ff;
                box-shadow: 0 0 4px #1890ff;
            }
        }
    }
    .orther-part{
        height: 44px;
        background-color: #b9dfff;
        display: flex;
        justify-content: flex-start;
        padding: 0 10px;
        user-select: none;

        .class-box,.date-box{
            font-weight: 700;
            font-size: 16px;
        }
        .date-box{
            margin-left: 182px;
        }
        .date-input{
            width: 360px;
            height: 30px;
            border: none;
            outline: none;
        }
    }
    .edit-part{
        display: flex;
        .input-part,.markdown-part{
            min-height: calc(100vh - 70px - 54px - 20px - 58px - 44px);
            width: 50%;
            background-color: #fff;
            padding: 30px;
            font-size: 18px;
        }
        .input-part{
            background-color: #d4f7ff;
            outline: none;
            overflow-y: hidden;
            border: none;
        }
    }
`