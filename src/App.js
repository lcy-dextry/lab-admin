import { useEffect } from 'react';
import { connect } from 'react-redux';
// 组件
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';
// 数据
import { login } from '@/redux/actions';
import { auth, app } from '@/utils/cloudBase';

const App = ({ loginState, login }) => {
  useEffect(() => {
    // app
    //   .auth()
    //   .signUpWithEmailAndPassword('wangleir1989@126.com', 'Lattice753*#^')
    //   .then(() => {
    //     console.log("发送验证邮件成功")
    //   });
    auth.hasLoginState() ? login(true) : login(false);
  }, [loginState]);
  return <>{loginState ? <Admin /> : <Login />}</>;
  // return <Admin />;
};
export default connect(
  state => ({
    loginState: state.loginState
  }),
  { login }
)(App);