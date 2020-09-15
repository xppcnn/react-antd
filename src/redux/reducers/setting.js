import AdminConfig from '@/config';
import { getLocalStore, setLocalStore } from '@utils/auth';

const SETTINGS_KEY = 'Admin-Settings';

const localSettings = getLocalStore(SETTINGS_KEY) || {};

const defaults = {
  fixedHeader: AdminConfig.fixedHeader,

  layout: AdminConfig.layout,

  theme: AdminConfig.theme,

  contentWidth: AdminConfig.contentWidth,

  colorWeak: AdminConfig.colorWeak,

  ...localSettings,
};

const UPDATE_SETTINSG = 'UPDATE_SETTINSG';

export const updateLayoutSettings = (
  settings
) => ({
  type: UPDATE_SETTINSG,
  payload: settings,
});

const setting = (
  state = defaults,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SETTINSG:
      setLocalStore(SETTINGS_KEY, payload);
      return {
        ...payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default setting;
