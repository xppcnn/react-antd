import { flattenRoute } from '../../router/utils';
import { getLocalStore, setLocalStore} from '@utils/auth';


const SIDEBAR_KEY = 'React-ant-Admin-SideBar-Opened';

const opened = getLocalStore(SIDEBAR_KEY, true);

const defaultApp = {
  sidebar: {
    opened: typeof opened === 'boolean' ? opened : true,
  },
  routes: [],
  flattenRoutes: [],
  init: false,
};

const SET_SIDE_BAR_OPENED = 'SET_SIDE_BAR_OPENED';
const SET_SIDE_BAR_ROUTES = 'SET_SIDE_BAR_ROUTES';
const RMOVE_SIDE_BAR_ROUTES = 'RMOVE_SIDE_BAR_ROUTES';

export const updateSideBar = (sidebar) => ({
  type: SET_SIDE_BAR_OPENED,
  payload: sidebar,
});

export const setSideBarRoutes = (routes) => ({
  type: SET_SIDE_BAR_ROUTES,
  payload: routes,
});

export const clearSideBarRoutes = () => ({
  type: RMOVE_SIDE_BAR_ROUTES,
  payload: null,
});

const appReducer = (state = defaultApp, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SIDE_BAR_OPENED:
      setLocalStore(SIDEBAR_KEY, payload .opened);

      return {
        ...state,
        sidebar: payload,
      };

    case SET_SIDE_BAR_ROUTES:
      return {
        ...state,
        routes: payload,
        flattenRoutes: flattenRoute(payload, true, false),
        init: true,
      };
    case RMOVE_SIDE_BAR_ROUTES:
      return {
        ...state,
        routes: [],
        flattenRoutes: [],
        init: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default appReducer;
