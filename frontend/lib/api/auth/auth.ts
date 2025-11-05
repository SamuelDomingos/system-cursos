import http from '@/utils/http';
import { LoginRequest, RegisterRequest } from '@/lib/api/types/auth';

export const login = async (credentials: LoginRequest): Promise<void> => {
    return await http.post<void>('/api/auth/login', credentials);
};

export const register = async (credentials: RegisterRequest): Promise<void> => {
    return await http.post<void>('/api/auth/register', credentials);
};
