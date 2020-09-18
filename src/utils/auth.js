import userApi from '../services/user';
import { idleCallback } from './index';

const ADMIN_ROLE = 'adminrole';
let currentUserRole;

const getAuthFromChildrenReduce = authChildren => {
  const result = authChildren?.reduce((sum, item) => [...sum, ...(item.authority || [])], []);
  return result?.length > 0 ? [...new Set(result)] : void 0;
};

/**
 * 重格式化以处理将子数据授权提前至上级文件夹.
 * 防止存储时结构存在问题导致菜单显示不正常，未来可作为性能优化项去除
 * @version 2018.10.18
 * @author weiiming
 */
function menuFormatForAuthority(menuItem) {
  const authChildren =
    menuItem.children && menuItem.children.map(item => menuFormatForAuthority(item));
  return {
    ...menuItem,
    children: authChildren,
    authority: [
      ADMIN_ROLE,
      ...(getAuthFromChildrenReduce(authChildren) || menuItem.authority || []),
    ],
  };
}

class CurrentUserAuthority {
  constructor() {
    this.roleName = 'guest';
    this.menuList = [];
    this.userInfo = {};
    this.pageAuthInfo = {};
    this.systemConf = {};
    this.reload();
  }

  getPromise() {
    return this.authorizedPromise;
  }

  getUserInfo() {
    return this.userInfo;
  }

  getPageAuthInfo() {
    return this.pageAuthInfo;
  }

  getMenuList() {
    return this.menuList;
  }

  getSystemConf() {
    return this.systemConf;
  }

  getRoleName() {
    return this.roleName;
  }

  reload() {
    this.authorizedPromise =
      !getToken() || getToken() === 'undefined'
        ? new Promise(resolve => resolve({ roleName: this.roleName, menuList: this.menuList }))
        : new Promise(resolve =>
            idleCallback(() =>
            userApi.getCurrentUser().then(res => {
                if (res && res.data) {
                  this.userInfo = JSON.parse(res.data?.userInfo || '{}');
                  this.roleName = this.userInfo?.authority || 'guest';
                  this.pageAuthInfo = JSON.parse(res.data?.pageAuthInfo || '{}');
                  this.menuList = JSON.parse(res.data?.menuInfo || '[]').map(item =>
                    menuFormatForAuthority(item)
                  );
                  this.systemConf = JSON.parse(res.data?.systemConfig || '[]').reduce(
                    (sum, item) => ({ ...sum, [item.confEnName]: item.confValue }),
                    {}
                  );
                }
                setAuthority(this.roleName);
                resolve({ roleName: this.roleName, menuList: this.menuList });
              })
            )
          );
  }
}

export const currentUserAuthority = new CurrentUserAuthority();

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // if (process.env.NODE_ENV === 'development') {
  //   return 'admin';
  // }
  if (!getToken() || getToken() === 'undefined') {
    return 'guest';
  }
  return currentUserRole || currentUserAuthority.getPromise();
}

export function setAuthority(authority) {
  // 改为使用闭包存储
  // const encodeAuthority = btoa(authority);
  // Object.defineProperty(window[windowStorage], 'role', {
  //   enumerable: false,
  //   configurable: false,
  //   writable: false,
  //   value: encodeAuthority,
  // });
  return (currentUserRole = authority);
}

export function getToken() {
  return localStorage.getItem('TOKEN') || '';
}

export function setToken(token) {
  return localStorage.setItem('TOKEN', token);
}



export function getLocalStore(name) {
  return localStorage.getItem(name) || '';
}

export function setLocalStore(name,value) {
  return localStorage.setItem(name, value);
}

export function removeLocalStore(name) {
  return localStorage.removeItem(name);
}