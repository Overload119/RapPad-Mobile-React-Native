let basePath = 'http://192.168.1.6:3000/api';
// Change to https://www.rappad.co/api to test on production.

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export default API = {
  login(data) {
    return fetch(basePath + '/sessions/sign_in', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        login: data.login,
        password: data.password
      })
    });
  }
};
