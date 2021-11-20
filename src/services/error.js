import {showThemeAlert} from '../helper/app-helper';
import constant from '../helper/constant';

export function checkApiStatus(data) {
  if (data === 500) {
    showThemeAlert({
      title: constant.appName,
      message: 'server.Something went wrong Please try again',
      leftBtn: 'OK',
    });
  }
  return true;
}

export function sessionTimeOut() {
  showThemeAlert({
    title: constant.appName,
    message: 'server.Your session is expired',
    leftBtn: 'OK',
  });
}
