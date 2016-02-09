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

const LOCAL_RAPS_KEY = 'localRaps/v5';

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
  async saveRap(params) {
    let isLocal = !!params.rap.isLocal;
    let rapId = params.rap.id;

    // If it has no ID, then it's a new rap.
    // If it's a new rap being pushed to the server, we set it to private.
    if (!rapId && !isLocal) {
      params.rap.visibility = 'private';
    }

    let request = await API.saveRap(params);

    if (request.response.status === 200 && isLocal) {
      // Remove the local rap, since we preserved it on the server.
      await this.deleteLocalRap(rapId);
    }

    // Update the local cache.
    return request.body;
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
  async deleteLocalRap(rapId) {
    localRaps = await this.loadLocalRaps();
    nextLocalRaps = []
    for (let ii = 0; ii < localRaps.length; ii++) {
      if (localRaps[ii].id === rapId) {
        console.info('Remove rap %s from array', localRaps[ii].title);
        continue;
      }
      nextLocalRaps.push(localRaps[ii]);
    }

    return storage.save({
      key: LOCAL_RAPS_KEY,
      rawData: nextLocalRaps,
      expires: null
    });
  },
  loadLocalRaps() {
    return storage.load({
      key: LOCAL_RAPS_KEY
    });
  },
  loadRap(params) {
    let key = 'rap/' + qs.stringify(params);
  },
  async loadCurrentUserRaps(params) {
    let key = `currentUserRaps/v2/${qs.stringify(params)}`;

    storage.sync[key] = async function(data) {
      let request = await API.getUserRaps(params);

      storage.save({
        key: key,
        rawData: request.body,
        expires: 0
      });

      return request.body;
    };

    return storage.load({
      key: key
    });
  }
};
