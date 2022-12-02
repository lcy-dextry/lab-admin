import styled from "styled-components";

export const QuitWrapper = styled.div`
    .quit-part{
        width: 40px;
        height: 40px;
        text-align: center;
        border-radius: 14px;
        background-color: transparent;
        transition: 0.3s;

        &:hover{
            background-color: #005cbb;

            & svg{
                color: #FFF !important;
            }
        }
    }
    svg{
        position: absolute;
        top: 7px;
        left: 7px;
    }
    .quit-btn{
        font-size: 26px;
        color: #005cbb;
    }
`