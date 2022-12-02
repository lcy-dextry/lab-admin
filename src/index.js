import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { Spin } from 'antd';
import store from '@/redux/store';
import '@/assets/css/reset.less'
import 'antd/dist/antd.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Suspense fallback={<Spin className='loading'/>}>
                <App />
            </Suspense>
        </BrowserRouter>
    </Provider>
);


