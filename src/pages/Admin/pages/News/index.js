import React, { memo, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect';
import { connect } from 'react-redux';
// 组件
import { notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { NewsWrapper } from './style'
import NewsTable from './components/Table'
import JumpButton from 'c/JumpButton';
// 数据
import { db } from '@/utils/cloudBase';
import { getNews } from '@/redux/actions';

const News = memo(({
    news,
    getNews
}) => {
    const [text, setText] = useState([]);
    // 获取
    const getNewTexts = () => {
        db.collection('news')
            .get()
            .then(res => {
                getNews(res.data);
            });
    };
    useDeepCompareEffect(() => {
        getNewTexts();
        setText(news);
    }, [news]);
    // 删除
    const deleteText = id => {
        db.collection('news')
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
        <NewsWrapper className='content'>
            <div className='header-part'>
                <JumpButton url={`/modifyNews`} text={'添加新闻'} />
            </div>
            <div className='table-part'>
                <NewsTable data={text} deleteText={deleteText} />
            </div>
        </NewsWrapper>
    )
})
export default connect(
    state => ({
        news: state.news
    }),
    { getNews }
)(News);