import styled from 'styled-components';

export const GuideWrapper = styled.div`
    position: fixed;
    z-index: 1;
    width: 160px;
    padding-bottom: 100vh;
    background-color: rgb(0, 92, 187);

    .school-badge{
        margin-left: 40px;
        margin-top: 20px;
        width: 80px;
        height: 80px;
        background-image: url(${require('@/assets/img/school-badge.png')});
        background-size: cover;
    }
    .guide-list{
        margin-top: 20px;
        padding: 0;
        display: flex;
        flex-wrap: wrap;

        a{
            width: 160px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #FFF;
            text-align: center;
            background-color: transparent;
            transition: 0.3s;

            &:hover{
                background-color: rgb(17, 139, 206);
            }
        }
        .active{
            background-color: rgb(17, 139, 206);
        }
    }
`