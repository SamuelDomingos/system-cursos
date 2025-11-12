import http from '@/utils/http';
import { User, UpdateUserDto } from '@/lib/api/types/users';

export const getUsers = async (): Promise<User[]> => {
    return await http.get<User[]>('/users');
};

export const getUserById = async (id: string): Promise<User> => {
    return await http.get<User>(`/users/${id}`);
};

export const updateUser = async (id: string, data: UpdateUserDto): Promise<User> => {
    return await http.patch<User>(`/users/${id}`, data);
};
