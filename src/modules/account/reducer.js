import {
  SET_SAFE_AREA_INTENT,
  START_LOADING,
  SET_USER_DETAIL,
  GET_WALLET,
  GET_TRANSACTIONS,
  SHOW_POPUP,
  SHOW_POPUP_QR,
  SHOW_POPUP_INFO,
  SEND_TRANSACTIONS,
  GET_FEE,
} from './constant';

export const initStateAccount = {
  email: process.env.NODE_ENV === 'development' ? 'test@gmail.com' : '',
  password: process.env.NODE_ENV === 'development' ? 'test1234' : '',
  userName: '',
  token: '',
  safeAreaInsetsData: {top: 0, bottom: 0, left: 0, right: 0},
  safeAreaInsetsDataChat: {top: 0, bottom: 0, left: 0, right: 0},
  safeAreaInsetsDefault: {top: 0, bottom: 0, left: 0, right: 0},
  userDetails: {
    status: 1,
    uid: '',
    wallet: {},
    address: {},
  },
  walletData: {
    wallet: {},
    address: {},
    status: 1,
    transactions: {},
  },
  transactionsData: {
    result: [],
    count: 0,
  },
  showPopup: {
    show: false,
    data: '',
  },
  showPopupQR: {
    show: false,
    data: '',
  },
  showPopupInfo: {
    show: false,
    data: '',
  },
};

export default (state = initStateAccount, action) => {
  switch (action.type) {
    case SET_SAFE_AREA_INTENT: {
      return {
        ...state,
        safeAreaInsetsDefault: action.payload,
        safeAreaInsetsData: action.payload,
      };
    }
    case START_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_USER_DETAIL: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case GET_WALLET: {
      return {
        ...state,
        walletData: action.payload,
      };
    }
    case GET_TRANSACTIONS: {
      return {
        ...state,
        transactionsData: action.payload,
      };
    }
    case SHOW_POPUP: {
      return {
        ...state,
        showPopup: action.payload,
      };
    }
    case SHOW_POPUP_QR: {
      return {
        ...state,
        showPopupQR: action.payload,
      };
    }
    case SHOW_POPUP_INFO: {
      return {
        ...state,
        showPopupInfo: action.payload,
      };
    }
    case SEND_TRANSACTIONS: {
      return {
        ...state,
        sendTransactions: action.payload,
      };
    }
    default:
      return state;
  }
};
