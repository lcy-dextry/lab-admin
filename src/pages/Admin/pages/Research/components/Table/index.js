import React, { memo } from 'react';
import moment from 'moment';
// 组件
import { TableWrapper } from './style';
import { Table, Space, Button, Popconfirm } from 'antd';
import JumpButton from 'c/JumpButton';
// 样式
import '@/assets/css/deleteConfirm.css';

const ResearchTable = memo((props) => {
  const { data, deleteText } = props;
  const columns = [
    {
      title: '分类',
      dataIndex: 'type',
      key: '_id',
      render: text => <strong>{text}</strong>
    },
    {
      title: '发布日期',
      dataIndex: 'date',
      key: '_id',
      sorter: (a, b) => a.date - b.date,
      render: text => <>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</>,
      sortDirections: ['descend'],
      defaultSortOrder: ['ascend']
    },
    {
      title: '操作',
      key: '_id',
      render: record => (
        <Space size='middle'>
          <JumpButton url={`/modifyResearch?id=${record._id}`} text={'修改'} />
          <Popconfirm
            placement='topRight'
            title='是否要删除该内容？'
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

export default ResearchTable