import axios from 'axios';
import cookie from 'js-cookie';

const instance = axios.create({
  baseURL: '/api/',
  timeout: 3000,
  headers: { 'x-csrf-token': cookie.get('csrfToken') },
});

instance.interceptors.request.use((config) => {
  window.NProgress.start();
  return config;
});

instance.interceptors.response.use((response) => {
  window.NProgress.done();
  return response;
});

export default instance;
