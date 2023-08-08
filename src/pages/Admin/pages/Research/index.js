import React, { memo, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect';
import { connect } from 'react-redux';
import { marked } from 'marked';
// 组件
import { ResearchWrapper } from './style'
import JumpButton from 'c/JumpButton';
// 数据
import { db } from '@/utils/cloudBase';
import { getResearchText } from '@/redux/actions';

const Research = memo(({
    texts,
    getResearchText
}) => {
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
    // 数据
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

    return (
        <ResearchWrapper className='content'>
            <div className='header-part'>
                <JumpButton url={`/modifyResearch?type=edit`} text={'修改'} />
            </div>
            <div className='show-part'>
                {text.map(item => {
                    return (
                        <div key={item._id}
                            className="markdown-part markdownStyle"
                            dangerouslySetInnerHTML={{
                                __html: marked(item.text).replace(/<pre>/g, "<pre>"),
                            }}
                        />
                    )
                })}
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


