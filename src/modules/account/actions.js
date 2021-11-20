import constant from '../../helper/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SET_SAFE_AREA_INTENT,
  SET_USER_DETAIL,
  START_LOADING,
  GET_WALLET,
  GET_TRANSACTIONS,
  SEND_TRANSACTIONS,
  GET_FEE,
  VALIDATE_ADDRESS,
  SHOW_POPUP,
  SHOW_POPUP_QR,
  SHOW_POPUP_INFO,
} from './constant';
import {initStateAccount} from './reducer';
import {
  walletRestoreService,
  createWalletService,
  getWalletService,
  getTransactionsService,
  sendTransactionsService,
  getFeeSerivce,
  validateAddressService,
} from './services';

export const appDefaultReducer = {
  account: initStateAccount,
};

/**
 * Get app data
 */
export const loadAppData = () => {
  return (dispatch, getState) => {
    console.log('calling when login');
    let userID = getState().account.userDetails.uid;
    return Promise.all([
      dispatch(getWallet(userID)),
      dispatch(getTransactions(userID)),
    ])
      .then(res => {
        dispatch({
          type: START_LOADING,
          payload: false,
        });
        return Promise.resolve(true);
      })
      .catch(error => {
        console.log('Error loadAppData ---> ', error);
        return Promise.reject(error);
      });
  };
};

export const restoreWallet = (phrase, secret) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return walletRestoreService(phrase, secret)
      .then(response => {
        dispatch(setLoader(false));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Button indicator
 */
export const setLoader = value => {
  return (dispatch, getState) => {
    dispatch({
      type: START_LOADING,
      payload: value,
    });
  };
};

/**
 * Manage SafeArea
 */
export const setSafeAreaIntent = data => {
  return (dispatch, getState) => {
    if (constant.isIOS) {
      return dispatch({
        type: SET_SAFE_AREA_INTENT,
        payload: data,
      });
    }
  };
};

/**
 * User update when SignIn/SingUp
 */
export const setUserDetail = objUser => {
  return (dispatch, getState) => {
    return dispatch({
      type: SET_USER_DETAIL,
      payload: objUser,
    });
  };
};

export const createWallet = () => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return createWalletService()
      .then(response => {
        dispatch(setLoader(false));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

export const getWallet = uid => {
  return (dispatch, getState) => {
    return getWalletService(uid)
      .then(response => {
        dispatch({
          type: GET_WALLET,
          payload: response.result,
        });
        return Promise.resolve(true);
      })
      .catch(error => {
        console.log('Error loadAppData ---> ', error);
        return Promise.reject(error);
      });
  };
};

export const getTransactions = uid => {
  return (dispatch, getState) => {
    return getTransactionsService(uid)
      .then(response => {
        dispatch({
          type: GET_TRANSACTIONS,
          payload: response.result,
        });
        return Promise.resolve(true);
      })
      .catch(error => {
        console.log('Error loadAppData ---> ', error);
        return Promise.reject(error);
      });
  };
};

export const sendTransactions = (uid, sender_address, fee, amount) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return sendTransactionsService(uid, sender_address, fee, amount)
      .then(response => {
        dispatch({
          type: SEND_TRANSACTIONS,
          payload: response.result,
        });
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log('Error loadAppData ---> ', error);
        return Promise.reject(error);
      });
  };
};

export const getFee = speed => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return getFeeSerivce(speed)
      .then(response => {
        dispatch({
          type: GET_FEE,
          payload: response.result,
        });
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log('Error loadAppData ---> ', error);
        return Promise.reject(error);
      });
  };
};

export const validateAddress = address => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return validateAddressService(address)
      .then(response => {
        dispatch({
          type: VALIDATE_ADDRESS,
          payload: response.result,
        });
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log('Error loadAppData ---> ', error);
        return Promise.reject(error);
      });
  };
};

/**
 * Show Popup
 */
export const setShowPopUP = objUser => {
  return (dispatch, getState) => {
    return dispatch({
      type: SHOW_POPUP,
      payload: objUser,
    });
  };
};

/**
 * Show Popup QR
 */
export const setShowQRPopUP = objUser => {
  return (dispatch, getState) => {
    return dispatch({
      type: SHOW_POPUP_QR,
      payload: objUser,
    });
  };
};

/**
 * Show Popup Info
 */
export const setShowInfoPopUP = objUser => {
  return (dispatch, getState) => {
    return dispatch({
      type: SHOW_POPUP_INFO,
      payload: objUser,
    });
  };
};
