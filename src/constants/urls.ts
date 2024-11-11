export const PUBLIC_URL = {
  LOGIN: '/login',
  HOME: '/',
  PROFILE: '/profile',
};

export const protectedRoutes = [PUBLIC_URL.HOME, PUBLIC_URL.PROFILE];
export const privateRoutes = [PUBLIC_URL.LOGIN];
