import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// 组件
import Guide from 'c/Guide';
import AppHeader from 'c/AppHeader';
import store from '@/store';
import RoutesMap from '@/utils/routes.js';

const App = memo(() => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Guide />
        <AppHeader />
        <RoutesMap />
      </BrowserRouter>
    </Provider>
  )
})
export default App;