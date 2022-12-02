import { useEffect } from 'react';
import { connect } from 'react-redux';
// 组件
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';
// 数据
import { login } from '@/redux/actions';

import { auth } from '@/utils/cloudBase';

const App = ({ loginState, login }) => {
  // auth
  //   .signUpWithEmailAndPassword('172816323@qq.com', 'fluidlab123')
  //   .then(() => {
  //     console.log('已发送邮件验证')
  //   });
  // useEffect(() => {
  //   auth.hasLoginState() ? login(true) : login(false);
  // }, [loginState]);
  // return <>{loginState ? <Admin /> : <Login />}</>;
  return <Admin />
};
export default connect(
  state => ({
    loginState: state.loginState
  }),
  { login }
)(App);