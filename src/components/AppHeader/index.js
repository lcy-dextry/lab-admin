import React, { memo } from 'react'
import { HomeOutlined } from '@ant-design/icons';
import { AppHeaderWrapper } from './style';
import { labURL } from '@/common/local'

const AppHeader = memo(() => {
  return (
    <AppHeaderWrapper className='wrap-v2'>
      <a href={labURL} className='to-lab'>
        <HomeOutlined style={{ color: '#005cbb', fontSize: '26px' }} />
      </a>
    </AppHeaderWrapper>
  )
})

export default AppHeader