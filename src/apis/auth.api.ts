import { IUser } from '@/@types/auth';
import { IGenericResponse } from '@/@types/common';
import { LoginBodyType } from '@/app/schema';
import http from '@/config/http.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const authRequest = {
  login: async (body: LoginBodyType) =>
    await http.post<IGenericResponse<IUser>>(
      'auth/v1/api-token-login-auth',
      body,
    ),

  auth: async (body: IGenericResponse<IUser>) =>
    await http.post('/api/auth/login', body, {
      baseUrl: process.env.NEXT_PUBLIC_URL,
    }),

  profile: async () =>
    await http.get<IGenericResponse<IUser>>('auth/v1/user-profile'),

  logout: async () => await http.delete<IGenericResponse>('auth/v1/logout'),

  removeToken: async () =>
    await http.post<IGenericResponse>(
      '/api/auth/logout',
      {},
      {
        baseUrl: process.env.NEXT_PUBLIC_URL,
      },
    ),
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (body: LoginBodyType) => authRequest.login(body),
  });
};

export const useLogout = () => {
  const nav = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authRequest.logout(),
    onSettled() {
      authRequest.removeToken().then(() => {
        nav.push('/login');
        queryClient.removeQueries();
      });
    },
  });
};

export const useFetchUser = () => {
  return useQuery({
    queryKey: ['fetch-user'],
    queryFn: () => authRequest.profile(),
  });
};

export default authRequest;
