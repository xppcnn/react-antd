import { request } from '@utils/request'

const UserApi = {
  login: params => request({
    method: "POST",
    url: '/api/account/login',
    data: params
  }),
  logout: params => console.log(params),
  updatePassword: params => console.log(params),
}

export default UserApi