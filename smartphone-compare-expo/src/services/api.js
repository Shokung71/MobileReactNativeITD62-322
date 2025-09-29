import { BASE_URL } from './config';

async function handle(res) {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.json();
}

export async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  return handle(res);
}

export async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return handle(res);
}

export async function put(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return handle(res);
}

export async function del(path) {
  const res = await fetch(`${BASE_URL}${path}`, { method: 'DELETE' });
  return handle(res);
}
