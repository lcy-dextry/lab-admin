import React, { memo, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect';
import { connect } from 'react-redux';
// 组件
import { notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { TutorWrapper } from './style'
import JumpButton from 'c/JumpButton';
import TutorTable from './components/Table';
// 数据
import { db } from '@/utils/cloudBase';
import { getTutorText } from '@/redux/actions';

const Tutor = memo(({
    texts,
    getTutorText
}) => {
    const [text, setText] = useState([]);
    // 获取
    const getNewTexts = () => {
        db.collection('tutor')
            .get()
            .then(res => {
                getTutorText(res.data);
            });
    };
    useDeepCompareEffect(() => {
        getNewTexts();
        setText(texts);
    }, [texts]);
    // 删除
    const deleteText = id => {
        db.collection('tutor')
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
        <TutorWrapper className='content'>
            <div className='header-part'>
                <JumpButton url={`/modifyTutor`} text={'添加'} />
            </div>
            <div className='table-part'>
                <TutorTable data={text} deleteText={deleteText} />
            </div>
        </TutorWrapper>
    )
})
export default connect(
    state => ({
        texts: state.tutorText
    }),
    { getTutorText }
)(Tutor);


