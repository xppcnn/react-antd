import { message } from 'antd';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  GET_ACCOUNT_INFO,
} from '../actions/actiontype';
import { setLocalStore } from '@utils/auth';
// import { getToken } from '@/utils/auth'

const id_token = 'dddddd';

const loginReducer = (
  state = {
    token: undefined,
    userInfo: {},
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      const { token } = action.payload;
      setLocalStore('TOKEN', token);
      message.success('登录成功');
      return {
        ...state,
        token: action.payload.token,
      };
    case LOGIN_FAILURE:
      message.error(action.payload.msg);
      return {
        ...state,
        token: '',
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        token: '',
      };
    case GET_ACCOUNT_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
export default loginReducer;
