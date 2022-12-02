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
            font-size: 14px;
            font-weight: 600;
            color: #000
        }
        tr td:nth-child(2){
            width: 300px;
            text-align: center;
            font-size: 14px;
            color: #000
        }
        tr td:nth-child(3){
            width: 200px;
            position: relative;
            text-align: center;
            font-size: 12px;
            color: #000;
        }
        tr td:nth-child(4){
            width: 200px;
            position: relative;
            text-align: center;
            font-size: 12px;
            color: #000;
        }
    }
`