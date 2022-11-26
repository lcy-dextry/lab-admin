import React, { memo } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
// 组件
import Tutor from '@/pages/Tutor'
import Research from '@/pages/Research'
import Publication from '@/pages/Publication'
import Members from '@/pages/Members'
import Activity from '@/pages/Activity'
import News from '@/pages/News'

const routes = memo(() => {
    const routes = useRoutes([
        { path: '', element: <Navigate to='/tutor' /> },
        { path: '/tutor', element: <Tutor /> },
        { path: '/research', element: <Research /> },
        { path: '/publication', element: <Publication /> },
        { path: '/members', element: <Members /> },
        { path: '/activity', element: <Activity /> },
        { path: '/news', element: <News /> },
    ])
    return routes;
})
export default routes