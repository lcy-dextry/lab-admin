import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
// 组件
import { CarouselWrapper } from './style'
import CarouselTable from './components/Table'
import { Modal, notification, Button, message } from 'antd';
import { FormOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
// 数据
import { db } from '@/utils/cloudBase';
import { getCarouselImg } from '@/redux/actions'

const Carousel = memo((props) => {
    // 获得所有数据
    const getAllImgs = () => {
        db.collection('carousel')
            .limit(1000)
            .get()
            .then(res => {
                props.getCarouselImg(res.data);
            });
    };
    // 获取所有内容
    useEffect(() => {
        getAllImgs();
    }, [])
    // 状态
    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    // 内容
    const [id, setID] = useState('');
    const [img, setImg] = useState('');
    // 添加窗口
    const addWindow = () => {
        setVisible(true);
    };
    // 清空窗口
    const clearWindow = () => {
        setID('');
        setImg('');
    };
    // 窗口确认
    const addSure = () => {
        if (!img) {
            message.info('请输入图片地址！');
            return;
        }
        if (isEdit) {
            updateImg();
        } else {
            addImg();
        }
    };
    // 窗口取消
    const addCancel = () => {
        setVisible(false);
        clearWindow();
        setIsEdit(false);
    };
    // 图片添加/更新
    const afterModified = isEdit => {
        const message = isEdit ? '更新图片成功' : '发表图片成功';
        const icon = isEdit ? (
            <FormOutlined style={{ color: 'blue' }} />
        ) : (
            <MessageOutlined style={{ color: 'blue' }} />
        );
        // 获取所有图片
        getAllImgs();
        addCancel();
        notification.open({
            message,
            icon,
            placement: 'bottomLeft',
            duration: 1.5,
        });
    };
    // 添加图片
    const addImg = () => {
        db.collection('carousel')
            .add({
                img,
            })
            .then(res => {
                afterModified(false);
            });
    };
    // 更新图片
    const updateImg = () => {
        db.collection('carousel')
            .doc(id)
            .update({
                img,
            })
            .then(res => {
                afterModified(true);
            });
    };
    // 编辑: 获得详情
    const editImg = ID => {
        setID(ID);
        setIsEdit(true);
        setVisible(true);
        const detailImg = props.imgs.filter(item => item._id === ID)[0];
        const { img } = detailImg;
        setImg(img);
    };
    // 删除
    const deleteImg = ID => {
        db.collection('carousel')
            .doc(ID)
            .remove()
            .then(res => {
                getAllImgs();
                notification.open({
                    message: '删除成功',
                    icon: <DeleteOutlined style={{ color: 'blue' }} />,
                    placement: 'bottomLeft',
                    duration: 1.5,
                });
            });
    };

    return (
        <CarouselWrapper className='content'>
            <div className="add-part">
                <Button type="primary" className="add-btn" onClick={addWindow}>
                    添加图片
                </Button>
            </div>
            <Modal
                title={isEdit ? '更新图片' : '添加图片'}
                open={visible}
                onOk={addSure}
                onCancel={addCancel}
                height={296}
                cancelText='取消'
                okText='确定'
            >
                <div className="img-input">
                    <textarea
                        className="text"
                        type="text"
                        value={img}
                        onChange={e => {
                            setImg(e.target.value);
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
                </div>
            </Modal>
            <CarouselTable data={props.imgs} deleteText={deleteImg} edit={editImg} />
        </CarouselWrapper>
    )
})
export default connect(state => ({ imgs: state.carousel }), { getCarouselImg })(Carousel);