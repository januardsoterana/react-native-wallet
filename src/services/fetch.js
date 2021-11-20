import constant from './constant';
import constants from './../helper/constant';
import {checkApiStatus} from './error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, TouchableOpacity} from 'react-native';
const productionURLToken = '';

const get = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;

    if (constants.isShowAPI) {
      console.log('=== API Call GET ====');
      console.log(baseURL);
      console.log('=== API Call ====');
    }

    fetch(baseURL, {
      ...options,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: undefined,
      },
    })
      .then(response => {
        console.log(response.headers.get('verified-mobile-token'));

        return Promise.all([response.status, response, response.headers || {}]);
      })
      .then(result => {
        console.log('=== API Response Success GET ===');
        console.log(result);
        resolve({
          code: result[0],
          result: result[1],
          headers: result[2],
        });
      })
      .catch(error => {
        console.log('=== API Response Fail GET ===');
        console.log(error.message);
        reject(error);
      });
  });
};

const getWithToken = (url = '', options = {}, test = false) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;
    if (test && constants.apiTesting) {
      baseURL = constant.baseUrl + url;
    }
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return AsyncStorage.getItem('user').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        header['user-access-token'] = userData.token;
        if (test && constants.apiTesting) {
          header['user-access-token'] = productionURLToken;
        }
      }

      if (constants.isShowAPI) {
        console.log('=== API Call GET ====');
        console.log(baseURL);
        console.log('Header');
        console.log(header);
      }

      fetch(baseURL, {
        ...options,
        method: 'GET',
        headers: header,
      })
        .then(res => res.json())
        .then(data => {
          if (data.code) {
            reject(new Error(data.message));
          } else {
            if (constants.isLoadShow) {
              console.log('=== API Response Success GET ===');
              console.log(data);
            }
            resolve(data);
          }
        })
        .catch(error => {
          if (constants.isLoadShow) {
            console.log('=== API Response Fail GET ===');
            console.log(error.message);
          }
          reject(error);
        });
    });
  });
};

const getWithTokenDetail = (url = '', options = {}, test = false) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;
    if (test && constants.apiTesting) {
      baseURL = constant.baseUrlTest + url;
    }
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return AsyncStorage.getItem('user').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        header['user-access-token'] = userData.token;
        if (test && constants.apiTesting) {
          header['user-access-token'] = productionURLToken;
        }
      }

      if (constants.isShowAPI) {
        console.log('=== API Call GET ====');
        console.log(baseURL);
        console.log('Header');
        console.log(header);
      }

      fetch(baseURL, {
        ...options,
        method: 'GET',
        headers: header,
      })
        // .then(res => [res.json(), res.headers || {}])
        .then(res => {
          return Promise.all([res.json(), res.headers || {}]);
        })
        .then(data => {
          if (data[0].code) {
            reject(new Error(data[0].message));
          } else {
            if (constants.isLoadShow) {
              console.log('=== API Response Success GET ===');
              console.log(data[0]);
            }
            resolve({
              result: data[0],
              headers: data[1] || {},
            });
          }
        })
        .catch(error => {
          if (constants.isLoadShow) {
            console.log('=== API Response Fail GET ===');
            console.log(error.message);
          }
          reject(error);
        });
    });
  });
};

/**
 * Post method
 * @param url
 * @param data
 * @param header
 * @returns {Promise<R>}
 */
const post = (url, data, header = {}) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;

    if (constants.isShowAPI) {
      console.log('=== API Call POST ====');
      console.log(baseURL);
      console.log('Body');
      console.log(data);
    }

    let reqHeader = Object.assign(header, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    if (constants.isLoadShow) {
      console.log('Header');
      console.log(reqHeader);
    }

    fetch(baseURL, {
      method: 'POST',
      headers: reqHeader,
      body: JSON.stringify(data),
    })
      .then(async response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return Promise.all([
            response.status,
            response.json(),
            response.headers,
          ]);
        } else {
          let responseText = await response.text();
          return Promise.all([
            response.status,
            responseText,
            response.headers || {},
          ]);
        }
      })
      .then(result => {
        if (constants.isLoadShow) {
          console.log('=== API Response Success POST ===');
          console.log(result);
        }
        checkApiStatus(result[0]);
        resolve({
          code: result[0],
          result: result[1],
          headers: result[2],
        });
      })
      .catch(error => {
        if (constants.isLoadShow) {
          console.log('=== API Response Fail POST ===');
          console.log(error);
        }
        reject(error);
      });
  });
};

const postWithToken = (url, data) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;

    if (constants.isShowAPI) {
      console.log('=== API Call POST ====');
      console.log(baseURL);
      console.log('Body');
      console.log(data);
    }

    let formdata = new FormData();
    const keys = Object.keys(data);
    keys.map((obj, index) => {
      formdata.append(obj, data[obj]);
    });

    fetch(baseURL, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(async response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return Promise.all([
            response.status,
            response.json(),
            response.headers,
          ]);
        } else {
          let responseText = await response.text();
          return Promise.all([
            response.status,
            responseText,
            response.headers || {},
          ]);
        }
      })
      .then(result => {
        if (constants.isLoadShow) {
          console.log('=== API Response Success POST ===');
          console.log(result);
        }
        checkApiStatus(result[0]);
        resolve({
          code: result[0],
          result: result[1],
          headers: result[2],
        });
      })
      .catch(error => {
        if (constants.isLoadShow) {
          console.log('=== API Response Fail POST ===');
          console.log(error);
        }
        reject(error);
      });
  });
};

export default {
  get,
  getWithToken,
  getWithTokenDetail,
  post,
  postWithToken,
};

/*
then(response => {
        return Promise.all([response.status, response.json()]);
      })
 */

/*
 let formdata = new FormData();
    const keys = Object.keys(data);
    keys.map((obj, index) => {
      formdata.append(obj, data[obj]);
    });

    fetch(baseURL, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(async response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return Promise.all([
            response.status,
            response.json(),
            response.headers,
          ]);
        } else {
          let responseText = await response.text();
          return Promise.all([
            response.status,
            responseText,
            response.headers || {},
          ]);
        }
      })
      .then(result => {
        if (constants.isLoadShow) {
          console.log('=== API Response Success POST ===');
          console.log(result);
        }
        checkApiStatus(result[0]);
        resolve({
          code: result[0],
          result: result[1],
          headers: result[2],
        });
      })
      .catch(error => {
        if (constants.isLoadShow) {
          console.log('=== API Response Fail POST ===');
          console.log(error);
        }
        reject(error);
      });
  });
 */
