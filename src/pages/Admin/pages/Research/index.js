import React, { memo, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect';
import { connect } from 'react-redux';
// 组件
import { notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ResearchWrapper } from './style'
import JumpButton from 'c/JumpButton';
import ResearchTable from './components/Table';
// 数据
import { db } from '@/utils/cloudBase';
import { getResearchText } from '@/redux/actions';

const Research = memo(({
    texts,
    getResearchText
}) => {
    const [text, setText] = useState([]);
    // 获取
    const getNewTexts = () => {
        db.collection('research')
            .get()
            .then(res => {
                getResearchText(res.data);
            });
    };
    useDeepCompareEffect(() => {
        getNewTexts();
        setText(texts);
    }, [texts]);
    // 删除
    const deleteText = id => {
        db.collection('research')
            .doc(id)
            .remove()
            .then(res => {
                getNewTexts();
                notification.open({
                    message: '删除成功',
                    icon: <DeleteOutlined style={{ color: 'blue' }} />,
                    placement: 'bottomLeft',
                    duration: 1.5
                });
            });
    };
    return (
        <ResearchWrapper className='content'>
            <div className='header-part'>
                <JumpButton url={`/modifyResearch`} text={'添加'} />
            </div>
            <div className='table-part'>
                <ResearchTable data={text} deleteText={deleteText} />
            </div>
        </ResearchWrapper>
    )
})
export default connect(
    state => ({
        texts: state.researchText
    }),
    { getResearchText }
)(Research);


