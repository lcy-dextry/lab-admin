import styled from "styled-components";

export const ModifyResearchWrapper = styled.div`
    .top-part {
        height: 58px;
        background-color: #b9dfff;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .pub-btn{
            margin-left: 10px;
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