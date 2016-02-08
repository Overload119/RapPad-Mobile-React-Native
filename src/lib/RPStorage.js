import React, {Alert} from 'react-native';
import Storage from 'react-native-storage';
import qs from 'qs';

import API from './API'

const Durations = {
  HOUR: 1000 * 3600,
  DAY: 1000 * 3600 * 24
}

let storage = new Storage({
  size: 10000,
  enableCache: true,
  defaultExpires: Durations.DAY, // 1 day
  sync: {}
});

export default RPStorage = {
  setUserSession(data) {
    return storage.save({
      key: 'userSession',
      rawData: {
        user_token: data.auth_token,
        user_email: data.email
      },
      expires: null
    });
  },
  getUserSession() {
    // Never expires.
    return storage.load({
      key: 'userSession',
      autoSync: false
    })
  },
  async getRhymes(params) {
    let key = 'rhymes/' + qs.stringify(params);

    storage.sync[key] = async function(_) {
      let request = await API.getRhymes(params);

      storage.save({
        key: key,
        rawData: request.body,
        expires: Durations.HOUR
      });

      return request.body;
    };

    return storage.load({
      key: key
    });
  },
  async loadLocalRaps(params) {
    let key = 'currentUserLocalRaps/' + qs.stringify(params);
    return storage.load({
      key: key
    });
  },
  async loadRap(params) {
    let key = 'rap/' + qs.stringify(params);
  },
  async loadCurrentUserRaps(params) {
    let key = 'currentUserRaps/' + qs.stringify(params);

    storage.sync[key] = async function(data) {
      let request = await API.getUserRaps(params);

      storage.save({
        key: key,
        rawData: request.body,
        expires: Durations.HOUR
      });

      return request.body;
    };

    return storage.load({
      key: key
    });
  }
};
