import AccountReducer from './modules/account/reducer';
import {combineReducers} from 'redux';
import {initStateAccount} from './modules/account/reducer';

export const appDefaultReducer = {
  account: initStateAccount,
};

const appReducer = combineReducers({
  account: AccountReducer,
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);
  if (action.type === 'RESET_STORE') {
    finalState = appDefaultReducer; //resetReducer(finalState, action);
  }
  return finalState;
}
