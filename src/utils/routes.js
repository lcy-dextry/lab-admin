import React, { memo } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
// 组件
const Carousel = React.lazy(_ => import('@/pages/Admin/pages/Carousel'))
const Tutor = React.lazy(_ => import('@/pages/Admin/pages/Tutor'))
const Research = React.lazy(_ => import('@/pages/Admin/pages/Research'))
const Publication = React.lazy(_ => import('@/pages/Admin/pages/Publication'))
const Members = React.lazy(_ => import('@/pages/Admin/pages/Members'))
const News = React.lazy(_ => import('@/pages/Admin/pages/News'))
const Activity = React.lazy(_ => import('@/pages/Admin/pages/Activity'))
const ModifyTutor = React.lazy(_ => import('@/pages/Admin/pages/ModifyTutor'))
const ModifyNews = React.lazy(_ => import('@/pages/Admin/pages/ModifyNews'))
const ModifyActivity = React.lazy(_ => import('@/pages/Admin/pages/ModifyActivity'))

const routes = memo(() => {
    const routes = useRoutes([
        { path: '', element: <Navigate to='/carousel' /> },
        { path: '/carousel', element: <Carousel /> },
        { path: '/tutor', element: <Tutor /> },
        { path: '/modifyTutor', element: <ModifyTutor /> },
        { path: '/research', element: <Research /> },
        { path: '/publication', element: <Publication /> },
        { path: '/members', element: <Members /> },
        { path: '/activity', element: <Activity /> },
        { path: '/modifyActivity', element: <ModifyActivity /> },
        { path: '/news', element: <News /> },
        { path: '/modifyNews', element: <ModifyNews /> },
    ])
    return routes;
})
export default routes