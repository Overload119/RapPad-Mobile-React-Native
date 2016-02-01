import Frisbee from 'frisbee';

let userSession = {};

const api = new Frisbee({
  baseURI: 'https://www.rappad.co/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default API = {
  clearSession() {
    userSession = {};
  },
  saveSession(response) {
    userSession.user_token = response.auth_token;
    userSession.user_email = response.email;
  },
  login(data) {
    return api.post('/sessions/sign_in', {
      body: JSON.stringify({
        login: data.login,
        password: data.password
      })
    });
  },
  getUserRaps(data) {
    Object.assign(data, userSession);
    return api.get('/raps', data);
  }
};
