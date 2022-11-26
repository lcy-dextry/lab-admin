import React, { memo } from 'react';
import { GuideWrapper } from './style';
import { NavLink } from 'react-router-dom';
// 数据
import { guideLinks } from '@/common/local';

const Guide = memo(() => {
  return (
    <GuideWrapper>
      <div className='school-badge' />
      <ul className='guide-list'>
        {
          guideLinks.map(item => {
            return <NavLink key={item.title} to={item.link}>{item.title}</NavLink>
          })
        }
      </ul>
    </GuideWrapper>
  )
})
export default Guide