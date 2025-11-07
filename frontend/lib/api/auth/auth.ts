import http from '@/utils/http';
import { LoginRequest, RegisterRequest } from '@/lib/api/types/auth';
import { User } from '@/lib/api/types/users';
import { cookies } from '@/utils/cookies';

export const login = async (credentials: LoginRequest): Promise<User> => {
    const response = await http.post<{ access_token: string, user: User }>('/auth/login', credentials);
    cookies.set('token', response.access_token, 7);
    cookies.set('user', JSON.stringify(response.user), 7);
    return response.user;
};

export const register = async (credentials: RegisterRequest): Promise<User> => {
    const response = await http.post<{ access_token: string, user: User }>('/auth/register', credentials);
    cookies.set('token', response.access_token, 7);
    cookies.set('user', JSON.stringify(response.user), 7);
    return response.user;
};

export const logout = async (): Promise<void> => {
  try {
    await http.post<void>('/auth/logout', {});
  } finally {
    cookies.remove('token');
    cookies.remove('user');
  }
};
