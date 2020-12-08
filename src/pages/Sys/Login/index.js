import React, { memo } from 'react';
import ParticlesBg from 'particles-bg'
import LoginMain from './LoginMain';
import './index.less';
import { connect } from 'react-redux';
import { LOGIN } from '@@/src/redux/actions/actiontype';

// connect(state => ({user: state.user}))
const Login = (props) => {

  const handleLogin = async (value) => {
     const res  = await props.dispatch({type: LOGIN, payload: value})
  }
  return (
    <div className="login">
      <div className="login-layout">
        <div className="login-layout-header"></div>
        <LoginMain login={handleLogin} loading={false} />
        <div className="login-layout-footer"></div>
        <ParticlesBg type="cobweb" bg={true} />
      </div>
    </div>
  )
}

export default connect(state => ({login: state.login}))(Login)