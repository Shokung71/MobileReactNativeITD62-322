import * as api from './api';

export async function listProducts(params = {}) {
  // params: { segment }
  const query = new URLSearchParams();
  if (params.segment) query.append('segment', params.segment);
  const q = query.toString();
  return api.get(`/products${q ? `?${q}` : ''}`);
}

export async function getProduct(id) {
  return api.get(`/products/${id}`);
}

export async function createProduct(product) {
  return api.post('/products', product);
}

export async function updateProduct(id, product) {
  return api.put(`/products/${id}`, product);
}

export async function deleteProduct(id) {
  return api.del(`/products/${id}`);
}
