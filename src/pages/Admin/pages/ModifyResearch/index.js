import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { marked } from 'marked';
import qs from 'qs';
// 组件
import { ModifyResearchWrapper } from './style'
import { CarryOutOutlined } from '@ant-design/icons';
import { message, Popconfirm, notification, Input } from 'antd';
// 数据
import { db } from '@/utils/cloudBase';
import { getResearchText } from '@/redux/actions';

const ModifyResearch = memo((props) => {
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
    const [text, setText] = useState('');
    const [markdownText, setMarkdownText] = useState('');
    // 状态
    const [isEdit, setIsEdit] = useState(false);
    const [type, setType] = useState('');
    const [isJudged, setIsJudged] = useState(false);
    // 获取所有内容
    useEffect(() => {
        getTexts();
    }, [])
    // 判断状态: 编辑
    useEffect(() => {
        const Edit = document.location.search !== '' ? true : false;
        if (Edit) {
            const params = qs.parse(document.location.search.slice(1));
            const { type } = params;
            setType(type);
        }
        setIsEdit(Edit);
        setIsJudged(true);
    }, [document.location.search]);
    // 自动填入内容
    useEffect(() => {
        if (!isJudged) return;
        if (!isEdit) {
            return;
        } else {
            const detailText = props.texts.filter(item => item.type === type)[0]
            const { text, markdownText } = detailText;
            setText(text);
            setMarkdownText(markdownText);
        }
    }, [props.texts, document.location.search])
    // 获取最新所有内容
    const getTexts = () => {
        db.collection('research')
            .get()
            .then(res => {
                props.getResearchText(res.data);
            });
    };
    // 更新数据库
    const updateToDB = () => {
        const page = '/research';
        const message = '更新内容成功！';
        const icon = <CarryOutOutlined style={{ color: 'blue' }} />

        db.collection('research')
            .where({ type: 'edit' })
            .update({
                text,
                markdownText,
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
        if (!text) {
            message.info('请输入研究内容！');
            return;
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
        <ModifyResearchWrapper className='content'>
            <div className="top-part">
                <Popconfirm
                    className="pub-btn"
                    placement="bottomRight"
                    title={`是否更新该内容？`}
                    onConfirm={turnText}
                    okText="Yes"
                    cancelText="No"
                >
                    更新内容
                </Popconfirm>
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
        </ModifyResearchWrapper>
    )
})
export default connect(
    state => ({
        texts: state.researchText
    }),
    { getResearchText }
)(ModifyResearch);