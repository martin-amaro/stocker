
export const hasRole = (user, ...allowedRoles) => {
  return user && allowedRoles.includes(user.role);
};