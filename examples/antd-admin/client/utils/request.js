import axios from 'axios';
import cookie from 'js-cookie';

export default axios.create({
  baseURL: '/api/',
  timeout: 3000,
  headers: { 'x-csrf-token': cookie.get('csrfToken') },
});
