import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux';
// 组件
import { notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ActivityWrapper } from './style'
import ActivityTable from './components/Table'
import JumpButton from 'c/JumpButton';
// 数据
import { db } from '@/utils/cloudBase';
import { getActivity } from '@/redux/actions';

const Activity = memo(({
    activity,
    getActivity
}) => {
    const [text, setText] = useState([]);
    // 获取
    const getNewTexts = () => {
        db.collection('activity')
            .get()
            .then(res => {
                getActivity(res.data);
            });
    };
    useEffect(() => {
        getNewTexts();
        setText(activity);
    }, [activity]);
    // 删除
    const deleteText = id => {
        db.collection('activity')
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
        <ActivityWrapper className='content'>
            <div className='header-part'>
                <JumpButton url={`/modifyActivity`} text={'添加活动'} />
            </div>
            <div className='table-part'>
                <ActivityTable data={text} deleteText={deleteText} />
            </div>
        </ActivityWrapper>
    )
})
export default connect(
    state => ({
        activity: state.activity
    }),
    { getActivity }
)(Activity);