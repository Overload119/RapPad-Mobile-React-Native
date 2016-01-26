let basePath = 'http://localhost:3000/api';

let API = {
  login(data) {
    return fetch(basePath + '/api/sessions/sign_in');
  }
};

export default API;
