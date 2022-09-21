import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {

  vus: 100,

  duration: '60s',

};


export default function () {
  let body = JSON.stringify({
    username: 'testuser1',
    password: 'password1',
    posClientID: "6a40c6a3-7128-41de-88a6-f77fcd39c3c4",
    version: "1.0.0"
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      name: 'login', // first request
    },
  };

  group('simple user journey', (_) => {
    // Login request
    const login_response = http.post('https://posmcmc-uat.thaibevapp.com/security/api/v1/Login', body, params);
    check(login_response, {
      'is status 200': (r) => r.status === 200,
      'is api key present': (r) => r.json().hasOwnProperty('token'),
    });
    params.headers['token'] = login_response.json()['token'];
    sleep(1);
  });
}
