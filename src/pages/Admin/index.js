import React, { memo } from 'react';
// 组件
import Guide from 'c/Guide';
import AppHeader from 'c/AppHeader';

const Admin = memo(() => {
    return (
        <>
            <Guide />
            <AppHeader />
        </>
    )
})
export default Admin;