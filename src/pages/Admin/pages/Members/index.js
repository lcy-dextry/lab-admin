import React, { memo, useState, useEffect } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect';
import { connect } from 'react-redux'
import moment from 'moment'
// 组件
import { MembersWrapper } from './style'
import MembersTable from './components/Table'
import ModalText from './components/ModalText'
import { Modal, notification, Button, message } from 'antd';
import { FormOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
// 数据
import { db } from '@/utils/cloudBase';
import { getMembers } from '@/redux/actions'

const Members = memo((props) => {
    // 获得所有数据
    const getAllMembers = () => {
        db.collection('members')
            .limit(1000)
            .get()
            .then(res => {
                props.getMembers(res.data);
            });
    };
    // 获取所有内容
    useEffect(() => {
        getAllMembers();
    }, [])
    // 状态
    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    // 内容
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [img, setImg] = useState('');
    // 添加窗口
    const addWindow = () => {
        setVisible(true);
    };
    // 清空窗口
    const clearWindow = () => {
        setID('');
        setName('');
        setEmail('');
        setYear('');
        setImg('');
    };
    // 窗口确认
    const addSure = () => {
        if (!name) {
            message.info('请输入学生姓名！');
            return;
        }
        if (!email) {
            message.info('请输入学生邮箱！');
            return;
        }
        if (!year) {
            message.info('请输入学生入学时间！');
            return;
        }
        if (!img) {
            message.info('请输入学生照片地址！');
            return;
        }
        if (isEdit) {
            updateMember();
        } else {
            addMember();
        }
    };
    // 窗口取消
    const addCancel = () => {
        setVisible(false);
        clearWindow();
        setIsEdit(false);
    };
    // 学生添加/更新
    const afterModified = isEdit => {
        const message = isEdit ? '更新成功' : '添加成功';
        const icon = isEdit ? (
            <FormOutlined style={{ color: 'blue' }} />
        ) : (
            <MessageOutlined style={{ color: 'blue' }} />
        );
        // 获取所有学生
        getAllMembers();
        addCancel();
        notification.open({
            message,
            icon,
            placement: 'bottomLeft',
            duration: 1.5,
        });
    };
    // 添加学生
    const addMember = () => {
        db.collection('members')
            .add({
                name,
                email,
                year: moment(year).format('YYYY-MM-DD'),
                img,
            })
            .then(res => {
                afterModified(false);
            });
    };
    // 更新学生
    const updateMember = () => {
        db.collection('members')
            .doc(id)
            .update({
                name,
                email,
                year,
                img,
            })
            .then(res => {
                afterModified(true);
            });
    };
    // 编辑: 获得详情
    const editMember = ID => {
        setID(ID);
        setIsEdit(true);
        setVisible(true);
        const detailMember = props.members.filter(item => item._id === ID)[0];
        const { name, email, year, img } = detailMember;
        setName(name);
        setEmail(email);
        setYear(year);
        setImg(img);
    };
    // 删除
    const deleteMember = ID => {
        db.collection('members')
            .doc(ID)
            .remove()
            .then(res => {
                getAllMembers();
                notification.open({
                    message: '删除成功',
                    icon: <DeleteOutlined style={{ color: 'blue' }} />,
                    placement: 'bottomLeft',
                    duration: 1.5,
                });
            });
    };
    // Modal中内容
    const modalList = [
        { text: '姓名', value: name, handleChange: setName },
        { text: '邮箱', value: email, handleChange: setEmail },
        { text: '入学时间', value: year, handleChange: setYear },
        { text: '照片地址', value: img, handleChange: setImg }
    ]
    return (
        <MembersWrapper className='content'>
            <div className="add-part">
                <Button type="primary" className="add-btn" onClick={addWindow}>
                    添加学生
                </Button>
            </div>
            <Modal
                title={isEdit ? '更新' : '添加'}
                open={visible}
                onOk={addSure}
                onCancel={addCancel}
                height={296}
                cancelText='取消'
                okText='确定'
            >
                <div className="member-input">
                    {
                        modalList.map(item => {
                            return (
                                <ModalText key={item.text}
                                    text={item.text}
                                    value={item.value}
                                    handleChange={item.handleChange}
                                />
                            )
                        })
                    }
                </div>
            </Modal>
            <MembersTable data={props.members} deleteText={deleteMember} edit={editMember} />
        </MembersWrapper>
    )
})
export default connect(state => ({ members: state.members }), { getMembers })(Members);