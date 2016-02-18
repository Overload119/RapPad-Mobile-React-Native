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
  fbLogin(data) {
    return api.post('/sessions/facebook_auth', {
      body: JSON.stringify({
        uid: data.uid,
        token: data.token,
        email: data.email,
      })
    });
  },
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
    let path = '/freestyle/rhymes?' + qs.stringify(params, { encode: true });
    console.log(path);
    return api.get(path);
  },
  async saveRap(params) {
    let userSession = await RPStorage.getUserSession();
    let path = '/raps?' + qs.stringify(userSession, { encode: false });

    if (params.rap.isLocal) {
      // If we're going from local to web, we have to setup some defaults
      // and remove local-only attributes from the rap.
      delete params.rap.id;
      delete params.rap.isLocal;
      params.rap.visibility = 'private';
    }

    // Update an existing rap
    if (params.rap.id) {
      path = '/raps/' +
        params.rap.id +
        '?' +
        qs.stringify(userSession, { encode: false });
      return api.put(path, {
        body: JSON.stringify(params.rap)
      });
    }

    // Create a new rap
    return api.post(path, {
      body: JSON.stringify(params.rap)
    });
  }
};
