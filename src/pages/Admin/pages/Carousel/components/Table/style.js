import styled from "styled-components";

export const TableWrapper = styled.div`
    .ant-table-thead{
        .ant-table-cell{
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            color: #000;
        }
    }
    .ant-table-tbody{
        tr td:nth-child(1){
            text-align: center;
            font-size: 12px;
            font-weight: 600;
            color: #000
        }

        tr td:nth-child(2){
            text-align: center;
            font-size: 14px;
            color: #000
        }

        tr td:nth-child(3){
            position: relative;
            text-align: center;
            font-size: 12px;
            color: #FFF;

            .modify-btn{
                border: 1px solid rgb(0,92,187);
                background-color: rgb(0,92,187);
                box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
                color: #FFF;
                transition: 0.3s;
    
                &:hover{
                    background-color: #40a9ff;
                    border-color: #40a9ff;
                    box-shadow: 0 0 4px #1890ff;
                }
            }
        }
    }
`