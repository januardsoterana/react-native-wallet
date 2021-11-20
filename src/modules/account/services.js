import request from '../../services/fetch';
import constant from '../../services/constant';

export const walletRestoreService = (phrase, secret = '') =>
  request.postWithToken(constant.walletRestore, {
    phrase: phrase,
    secret: secret,
  });

export const createWalletService = (phrase, secret = '') =>
  request.post(constant.walletCreate);

export const getWalletService = uid =>
  request.postWithToken(constant.getWallet, {
    uid: uid,
  });

export const getTransactionsService = uid =>
  request.postWithToken(constant.getTransactions, {
    uid: uid,
  });

export const sendTransactionsService = (uid, sender_address, fee, amount) =>
  request.postWithToken(constant.sendTransactions, {
    uid: uid,
    address: sender_address,
    fee: fee,
    amount: amount,
  });

export const getFeeSerivce = speed =>
  request.postWithToken(constant.getFee, {
    speed: speed,
  });

export const validateAddressService = address =>
  request.postWithToken(constant.validateAddress, {
    address: address,
  });
