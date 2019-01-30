'use strict';

import Axios from 'axios';

Axios.defaults.withCredentials = true;
Axios.defaults.xsrfCookieName = 'csrfToken';
Axios.defaults.xsrfHeaderName = 'x-csrf-token';

export default Axios;

export async function getAllUsers() {
  const { data } = await Axios.get('/api/users');

  if (data.success) {
    return data.data;
  }
}

export async function createUser(name: string, email: string) {
  const { data } = await Axios.post('/api/users', {
    name,
    email,
  });

  if (data.success) {
    return data.data;
  }
}

export async function updateUser(id: number, name: string, email: string) {
  const { data } = await Axios.put(`/api/users/${id}`, {
    name,
    email,
  });

  if (data.success) {
    return data.data;
  }
}
