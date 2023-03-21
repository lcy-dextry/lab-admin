import styled from "styled-components";

export const CarouselWrapper = styled.div`
    .add-part{
        height: 50px;
        background-color: #b9dfff;

        .ant-btn{
            margin: 5px;
            width: 86px;
            height: 40px;
            font-size: 16px;
            border: 1px solid rgb(0,92,187);
            background-color: rgb(0,92,187);
            box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
            color: #FFF;
            font-size: 14px;
            transition: 0.3s;

            &:hover{
                background-color: #40a9ff;
                border-color: #40a9ff;
                box-shadow: 0 0 4px #1890ff;
            }
        }
    }
`