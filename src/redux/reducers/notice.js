const defaultUser = {
  notice: {
    count: 2,
    title: '通知',
    list: [
      {
        title: '版本发布通知',
        message: 'xxx 提交新的版本发布，需要你去处理',
        route: '/',
        time: '2019-10-10 20:30:10',
        read: 0,
        extra: {
          text: '加急',
          level: 'danger',
        },
      },
      {
        title: '版本发布通知',
        message: 'xxx 提交新的版本发布，需要你去处理',
        route: '/',
        time: '2019-10-10 20:30:10',
        read: 0,
        extra: {
          text: '加急',
          level: 'warning',
        },
      },
    ],
  },
  message: {
    count: 2,
    title: '消息',
    list: [
      {
        title: '版本发布通知',
        message: 'xxx 提交新的版本发布，需要你去处理',
        route: '/',
        time: '2019-10-10 20:30:10',
        read: 0,
        extra: {
          text: '加急',
          level: 'danger',
        },
      },
      {
        title: '版本发布通知',
        message: 'xxx 提交新的版本发布，需要你去处理',
        route: '/',
        time: '2019-10-10 20:30:10',
        read: 0,
        extra: {
          text: '加急',
          level: 'warning',
        },
      },
    ],
  },
  pending: {
    count: 2,
    title: '进行中',
    list: [
      {
        title: '版本发布通知',
        message: 'xxx 提交新的版本发布，需要你去处理',
        route: '/',
        time: '2019-10-10 20:30:10',
        read: 0,
        extra: {
          text: '加急',
          level: 'danger',
        },
      },
      {
        title: '版本发布通知',
        message: 'xxx 提交新的版本发布，需要你去处理',
        route: '/',
        time: '2019-10-10 20:30:10',
        read: 0,
        extra: {
          text: '加急',
          level: 'warning',
        },
      },
    ],
  },
};

const CLEAR_NOTICE_BY_KEY = 'CLEAR_NOTICE_BY_KEY';

const READ_NOTICE_BY_KEY_ABD_INDEX = 'READ_NOTICE_BY_KEY_ABD_INDEX';

export const clearNoticeByKey= (
  key
) => ({
  type: CLEAR_NOTICE_BY_KEY,
  payload: key,
});


export const readNoticeByKeyAndIndex= (payload) => ({
  type: READ_NOTICE_BY_KEY_ABD_INDEX,
  payload,
});

const noticeReducer= (
  state = defaultUser,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_NOTICE_BY_KEY:
      return {
        ...state,
        [`${payload}`]: { ...state[payload], count: 0, list: [] },
      };
    case READ_NOTICE_BY_KEY_ABD_INDEX:
      return {
        ...state,
        [`${(payload).key}`]: {
          ...state[(payload).key],
          read: 1,
          count: (payload).count,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default noticeReducer;
