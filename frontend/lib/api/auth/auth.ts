import http from '@/utils/http';
import { LoginRequest, RegisterRequest } from '@/lib/api/types/auth';
import { cookies } from '@/utils/cookies';

export const login = async (credentials: LoginRequest): Promise<void> => {
    const response = await http.post<void>('/auth/login', credentials);
    cookies.set('token', response.token, 7);
    return response;
};

export const register = async (credentials: RegisterRequest): Promise<void> => {
    const response = await http.post<void>('/auth/register', credentials);
    cookies.set('token', response.token, 7);
    return response;
};

export const logout = async (): Promise<void> => {
  try {
    await http.post<void>('/auth/logout', {});
  } finally {
    cookies.remove('auth_token');
    cookies.remove('refresh_token');
    localStorage.removeItem('auth_token');
  }
};
