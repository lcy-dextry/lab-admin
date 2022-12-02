import React, { memo } from 'react';
// 组件
import Guide from 'c/Guide';
import AppHeader from 'c/AppHeader';
import RoutesMap from '@/utils/routes.js';

const Admin = memo(() => {
    return (
        <>
            <Guide />
            <AppHeader />
            <RoutesMap />
        </>
    )
})
export default Admin;