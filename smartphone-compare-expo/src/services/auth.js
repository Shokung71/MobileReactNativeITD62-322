import * as api from './api';

export async function login(username, password) {
  const users = await api.get(`/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
  if (users.length === 0) throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  return users[0];
}

export async function register({ username, password, img_profile }) {
  // role เป็น user เสมอ
  const exists = await api.get(`/users?username=${encodeURIComponent(username)}`);
  if (exists.length > 0) throw new Error('มีผู้ใช้งานชื่อนี้แล้ว');
  const payload = { username, password, role_type: 'user', img_profile: img_profile || '' };
  const created = await api.post('/users', payload);
  return created;
}

export async function listUsers() {
  return api.get('/users');
}

export async function updateUser(id, data) {
  return api.put(`/users/${id}`, data);
}

export async function deleteUser(id) {
  return api.del(`/users/${id}`);
}
