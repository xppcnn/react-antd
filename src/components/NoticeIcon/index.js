import React, { memo, useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { message } from 'antd';
import NavDropdown from '../LayoutNavBar/NavDropdown';
import NavBarItem from '../LayoutNavBar/NavBarItem';
import {
  clearNoticeByKey,
  readNoticeByKeyAndIndex,
} from '@redux/reducers/notice';
import renderNoticeTab from './NoticeTab';
import './index.less';


function NoticeIcon(props) {
  const [noticeVisible, setNoticeVisible] = useState(false);

  const onNoticeIconClick = useCallback(() => {
    setNoticeVisible(true);
  }, []);

  const closeNotice = useCallback(() => {
    setNoticeVisible(false);
  }, []);

  useEffect(() => {
    const root = window.document.getElementById('root');

    if (root) {
      root.addEventListener('click', closeNotice, false);
    }
    return () => {
      if (root) {
        root.removeEventListener('click', closeNotice);
      }
    };
  }, [closeNotice]);

  const onMessageClick = useCallback(
    (key, index) => {
      const item = props.notices[key];
      if (item.list[index].read === 1) return;

      props.readNoticeByKeyAndIndex({ key, index, count: item.count - 1 });
    },
    [props.notices, props.readNoticeByKeyAndIndex],
  );

  const onClear = useCallback(
    (key) => {
      props.clearNoticeByKey(key);
    },
    [props.clearNoticeByKey],
  );

  const onMore = useCallback((key) => {
    message.success(key);
  }, []);

  const noticeTotal = Object.values(props.notices)
    .map((notice) => notice.count)
    .reduce((a, b) => a + b);

  return (
    <NavDropdown
      visible={noticeVisible}
      overlay={renderNoticeTab(props.notices, onMessageClick, onClear, onMore)}
      trigger={['click']}
      placement="topLeft"
    >
      <div
        className={classnames(
          'layout__navbar__menu-item',
          `layout__navbar__menu-item--${props.theme}`,
        )}
      >
        <NavBarItem
          onClick={onNoticeIconClick}
          icon="bell"
          count={noticeTotal}
          overflowCount={99}
        ></NavBarItem>
      </div>
    </NavDropdown>
  );
}

export default connect(({ settings: { theme }, notices }) => ({ theme, notices }), {
  clearNoticeByKey,
  readNoticeByKeyAndIndex,
})(memo(NoticeIcon));
