import http from '@/utils/http';
import { LoginRequest, RegisterRequest } from '@/lib/api/types/auth';
import { User } from '@/lib/api/types/users';
import { cookies } from '@/utils/cookies';

export const login = async (credentials: LoginRequest): Promise<User> => {
    const response = await http.post<User & { access_token: string }>('/auth/login', credentials);
    const { access_token, ...userData } = response;
    const userWithIdAsString = { ...userData, id: String(userData.id) };
    cookies.set('token', access_token, 7);
    cookies.set('user', JSON.stringify(userWithIdAsString), 7);
    return userWithIdAsString;
};

export const register = async (credentials: RegisterRequest): Promise<User> => {
    const response = await http.post<User & { access_token: string }>('/auth/register', credentials);
    const { access_token, ...userData } = response;
    const userWithIdAsString = { ...userData, id: String(userData.id) };
    cookies.set('token', access_token, 7);
    cookies.set('user', JSON.stringify(userWithIdAsString), 7);
    return userWithIdAsString;
};

export const logout = async (): Promise<void> => {
  try {
    await http.post<void>('/auth/logout', {});
  } finally {
    cookies.remove('token');
    cookies.remove('user');
  }
};
