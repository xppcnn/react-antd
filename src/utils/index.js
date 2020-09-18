export const queryURL = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1)
    .match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}


/**
 * 推迟 callback 至下一事件循环周期内执行
 * @author xwl
 * @param {function} callback -推迟方法
 */
export function idleCallback(callback) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback);
  } else setTimeout(callback,1500);
}