import React, {Alert} from 'react-native';
import Storage from 'react-native-storage';
import qs from 'qs';
import uuid from 'uuid';

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

const LOCAL_RAPS_KEY = 'localRaps/v4';
const SERVER_RAPS_KEY = '';

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
  async saveLocalRap(params) {
    let localRaps;

    try {
      localRaps = await storage.load({
        key: LOCAL_RAPS_KEY
      });
    } catch(err) {
      console.warn('Failed to load %s', LOCAL_RAPS_KEY);
      localRaps = [];
    }

    isUpdate = false;
    for (let ii = 0; ii < localRaps.length; ii++) {
      if (localRaps[ii].id === params.rap.id) {
        // Update the rap.
        Object.assign(localRaps[ii], params.rap);
        isUpdate = true;
        console.info('Updated rap %s', localRaps[ii].title);
        break;
      }
    }

    if (!isUpdate) {
      localRaps.push(params.rap);
      console.info('Appending new rap, "%s"', params.rap.title);
    }

    return storage.save({
      key: LOCAL_RAPS_KEY,
      rawData: localRaps,
      expires: null
    });
  },
  async loadLocalRaps(params) {
    return storage.load({
      key: LOCAL_RAPS_KEY
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
