import http from '@/utils/http';
import { User } from '@/lib/api/types/users';

export const getUsers = async (): Promise<User[]> => {
    return await http.get<User[]>('/api/users');
};

export const getUserById = async (id: string): Promise<User> => {
    return await http.get<User>(`/api/users/${id}`);
};
