import React, { memo } from 'react';
// 组件
import { TableWrapper } from './style';
import { Table, Space, Button, Popconfirm } from 'antd';
// 样式
import '@/assets/css/deleteConfirm.css';

const CarouselTable = memo((props) => {
  const { data, deleteText, edit } = props;
  const columns = [
    {
      title: '图片',
      dataIndex: 'img',
      key: '_id',
      render: text => <>{text}</>
    },
    {
      title: '操作',
      key: '_id',
      render: record => (
        <Space size='middle'>
          <Button className='modify-btn' type="primary" onClick={() => edit(record._id)}>
            修改
          </Button>
          <Popconfirm
            placement='topRight'
            title='是否要删除该图片？'
            onConfirm={() => {
              deleteText(record._id);
            }}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];
  return (
    <TableWrapper>
      <Table
        size='middle'
        className='Table'
        bordered
        pagination={{
          position: ['bottomCenter'],
          defaultPageSize: 11,
          hideOnSinglePage: true,
          showTitle: false,
          size: ['small']
        }}
        columns={columns}
        dataSource={data}
        rowKey={columns => columns._id}
        showSorterTooltip={false}
      />
    </TableWrapper>
  )
})

export default CarouselTable