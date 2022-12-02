import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
// 组件
import { PublicationWrapper } from './style'
import PublicationTable from './components/Table'
import { Modal, notification, Button, message } from 'antd';
import { FormOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
// 数据
import { db } from '@/utils/cloudBase';
import { getPublication } from '@/redux/actions'

const Publication = memo((props) => {
    // 获得所有数据
    const getAllPapers = () => {
        db.collection('publication')
            .limit(1000)
            .get()
            .then(res => {
                props.getPublication(res.data);
            });
    };
    // 获取所有内容
    useEffect(() => {
        getAllPapers();
    }, [])
    // 状态
    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    // 内容
    const [id, setID] = useState('');
    const [year, setYear] = useState('');
    const [paper, setPaper] = useState('');
    // 添加窗口
    const addWindow = () => {
        setVisible(true);
    };
    // 清空窗口
    const clearWindow = () => {
        setID('');
        setYear('');
        setPaper('');
    };
    // 窗口确认
    const addSure = () => {
        if (!paper) {
            message.info('请输入论文信息！');
            return;
        }
        if (isEdit) {
            updatePaper();
        } else {
            addPaper();
        }
    };
    // 窗口取消
    const addCancel = () => {
        setVisible(false);
        clearWindow();
        setIsEdit(false);
    };
    // 论文添加/更新
    const afterModified = isEdit => {
        const message = isEdit ? '更新论文成功' : '发表论文成功';
        const icon = isEdit ? (
            <FormOutlined style={{ color: 'blue' }} />
        ) : (
            <MessageOutlined style={{ color: 'blue' }} />
        );
        // 获取所有论文
        getAllPapers();
        addCancel();
        notification.open({
            message,
            icon,
            placement: 'bottomLeft',
            duration: 1.5,
        });
    };
    // 添加论文
    const addPaper = () => {
        db.collection('publication')
            .add({
                paper,
                year,
            })
            .then(res => {
                afterModified(false);
            });
    };
    // 更新论文
    const updatePaper = () => {
        db.collection('publication')
            .doc(id)
            .update({
                paper,
                year,
            })
            .then(res => {
                afterModified(true);
            });
    };
    // 编辑: 获得详情
    const editPaper = ID => {
        setID(ID);
        setIsEdit(true);
        setVisible(true);
        const detailPaper = props.papers.filter(item => item._id === ID)[0];
        const { paper, year } = detailPaper;
        setPaper(paper);
        setYear(year);
    };
    // 删除
    const deletePaper = ID => {
        db.collection('publication')
            .doc(ID)
            .remove()
            .then(res => {
                getAllPapers();
                notification.open({
                    message: '删除成功',
                    icon: <DeleteOutlined style={{ color: 'blue' }} />,
                    placement: 'bottomLeft',
                    duration: 1.5,
                });
            });
    };

    return (
        <PublicationWrapper className='content'>
            <div className="add-part">
                <Button type="primary" className="add-btn" onClick={addWindow}>
                    添加论文
                </Button>
            </div>
            <Modal
                title={isEdit ? '更新论文' : '添加论文'}
                open={visible}
                onOk={addSure}
                onCancel={addCancel}
                height={296}
                cancelText='取消'
                okText='确定'
            >
                <div className="paper-input">
                    <textarea
                        className="text"
                        type="text"
                        value={paper}
                        onChange={e => {
                            setPaper(e.target.value);
                        }}
                        style={{
                            width: '100%',
                            height: '120px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            resize: 'none',
                            outline: 'none',
                            fontSize: '12px'
                        }}
                    />
                    <div className="year-box">
                        年份：
                        <input
                            className="year-input"
                            type="text"
                            value={year}
                            onChange={e => {
                                setYear(e.target.value);
                            }}
                            style={{
                                width: '100px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                resize: 'none',
                                outline: 'none',
                                fontSize: '12px'
                            }}
                        />
                    </div>
                </div>
            </Modal>
            <PublicationTable data={props.papers} deleteText={deletePaper} edit={editPaper} />
        </PublicationWrapper>
    )
})
export default connect(state => ({ papers: state.publication }), { getPublication })(Publication);