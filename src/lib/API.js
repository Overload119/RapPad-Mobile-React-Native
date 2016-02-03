import React, {Alert} from 'react-native';
import Frisbee from 'frisbee';
import qs from 'qs';

import RPStorage from './RPStorage';

const api = new Frisbee({
  baseURI: 'https://www.rappad.co/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// All requests must have the userSession attached to it, except
// auth endpoints.

export default API = {
  login(data) {
    return api.post('/sessions/sign_in', {
      body: JSON.stringify({
        login: data.login,
        password: data.password
      })
    });
  },
  async getUserRaps(params) {
    let userSession = await RPStorage.getUserSession();
    Object.assign(params, userSession);
    path = '/raps?' + qs.stringify(params, { encode: false });
    return api.get(path);
  },
  async getDiscussParams(params = {}) {
    let userSession = await RPStorage.getUserSession();
    Object.assign(params, userSession);
    path = '/discuss?' + qs.stringify(params, { encode: false });
    return api.get(path);
  },
  getRhymes(params = {}) {
    path = '/freestyle/rhymes?' + qs.stringify(params, { encode: true });
    console.log(path);
    return api.get(path);
  }
};
