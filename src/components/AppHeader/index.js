import React, { memo } from 'react'
import { HomeOutlined } from '@ant-design/icons';
// 数据
import { labURL } from '@/common/local'
// 组件
import Quit from '../Quit';
import { AppHeaderWrapper } from './style';

const AppHeader = memo(() => {
  return (
    <AppHeaderWrapper className='wrap-v2'>
      <a href={labURL} className='to-lab' target='_blank' rel="noreferrer">
        <HomeOutlined style={{ color: '#005cbb', fontSize: '26px' }} />
      </a>
      <Quit />
    </AppHeaderWrapper>
  )
})

export default AppHeader