import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { marked } from 'marked';
import qs from 'qs';
// 组件
import { ModifyTutorWrapper } from './style'
import { CarryOutOutlined } from '@ant-design/icons';
import { message, Popconfirm, notification, Input } from 'antd';
// 数据
import { db } from '@/utils/cloudBase';
import { getTutorText } from '@/redux/actions';

const ModifyTutor = memo((props) => {
    // 配置marked
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: false
    })
    // 内容
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [text, setText] = useState('');
    const [markdownText, setMarkdownText] = useState('');
    // 状态
    const [isEdit, setIsEdit] = useState(false);
    const [id, setID] = useState('');
    const [isJudged, setIsJudged] = useState(false);
    // 获取所有内容
    useEffect(() => {
        getTexts();
    }, [])
    // 判断状态: 编辑/添加
    useEffect(() => {
        const Edit = document.location.search !== '' ? true : false;
        if (Edit) {
            const params = qs.parse(document.location.search.slice(1));
            const { id } = params;
            setID(id);
        }
        setIsEdit(Edit);
        setIsJudged(true);
    }, [document.location.search]);
    // 编辑=自动填入内容
    useEffect(() => {
        if (!isJudged) return;
        if (!isEdit) {
            setDate(moment().format('YYYY-MM-DD HH:mm:ss').replace(/ /g, ' '));
            return;
        } else {
            const detailText = props.texts.filter(item => item._id === id)[0]
            const { type, location, text, markdownText, date } = detailText;
            setType(type);
            setLocation(location);
            setText(text);
            setMarkdownText(markdownText);
            setDate(moment(date).format('YYYY-MM-DD HH:mm:ss').replace(/ /g, ' '));
        }
    }, [props.texts, document.location.search])
    // 获取最新所有内容
    const getTexts = () => {
        db.collection('tutor')
            .get()
            .then(res => {
                props.getTutorText(res.data);
            });
    };
    // 添加到数据库
    const addToDB = () => {
        const page = '/tutor';
        const message = '添加内容成功！';
        const icon = <CarryOutOutlined style={{ color: 'blue' }} />

        db.collection('tutor')
            .add({
                type,
                location,
                date: new Date().getTime(),
                text,
                markdownText
            })
            .then(res => {
                // console.log(res);
                getTexts();
                window.location.href = page;
                notification.open({
                    message,
                    placement: 'bottomLeft',
                    icon,
                    duration: 1.5,
                });
            });
    };
    // 更新数据库
    const updateToDB = () => {
        const page = '/tutor';
        const message = '更新内容成功！';
        const icon = <CarryOutOutlined style={{ color: 'blue' }} />

        db.collection('tutor')
            .doc(id)
            .update({
                type,
                location,
                text,
                markdownText,
                date: new Date(date).getTime(),
            })
            .then(res => {
                getTexts();
                window.location.href = page;
                notification.open({
                    message,
                    placement: 'bottomLeft',
                    icon,
                    duration: 1.5,
                });
            });
    };
    // 提交内容
    const turnText = () => {
        if (!type) {
            message.info('请输入分类！');
            return;
        }
        if (!location) {
            message.info('请输入地址！');
            return;
        }
        if (!isEdit) {
            addToDB();
        } else {
            updateToDB();
        }
    };
    // markdown预览
    const changeText = e => {
        setText(e.target.value);
        let html = marked(e.target.value);
        setMarkdownText(html);
    }
    return (
        <ModifyTutorWrapper className='content'>
            <div className="title-part">
                <input
                    className="title-input"
                    placeholder="请输入分类..."
                    value={type}
                    onChange={e => {
                        setType(e.target.value);
                    }}
                />
                <Popconfirm
                    className="pub-btn"
                    placement="bottomRight"
                    title={`是否${isEdit ? '更新' : '发布'}该内容？`}
                    onConfirm={turnText}
                    okText="Yes"
                    cancelText="No"
                >
                    {isEdit ? '更新' : '发布'}
                    内容
                </Popconfirm>
            </div>
            <div className="orther-part">
                <div className="location-box">
                    内容地址：
                    <input
                        className="location-input"
                        type="text"
                        value={location}
                        onChange={e => {
                            setLocation(e.target.value);
                        }}
                    />
                </div>
                <div className="date-box">
                    时间：
                    <input
                        className="date-input"
                        type="text"
                        value={date}
                        onChange={e => {
                            setDate(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="edit-part">
                <Input.TextArea
                    value={text}
                    className='input-part'
                    onChange={changeText} />
                <div
                    className="markdown-part markdownStyle"
                    dangerouslySetInnerHTML={{
                        __html: marked(text).replace(/<pre>/g, "<pre>"),
                    }}
                ></div>
            </div>
        </ModifyTutorWrapper>
    )
})
export default connect(
    state => ({
        texts: state.tutorText
    }),
    { getTutorText }
)(ModifyTutor);