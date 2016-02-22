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

export default API = {
  login(data) {
    return api.post('/sessions/sign_in', {
      body: JSON.stringify({
        login: data.login,
        password: data.password
      })
    });
  },
  register(data) {
    return api.post('/sessions/sign_up', {
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    });
  },
  getUserRaps(params) {
    path = '/raps?' + qs.stringify(params, { encode: false });
    return api.get(path);
  }
};
