export function isAdmin(user) {
  return user && user.role_type === 'admin';
}
