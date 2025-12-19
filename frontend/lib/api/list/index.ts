import http from '@/utils/http';
import { CreateListDto, List, UpdateListDto } from '../types/list';

export const createList = async (dto: CreateListDto): Promise<List> => {
    const result = await http.post<List>('/list', dto);
    return result;
};

export const findAll = async (
): Promise<List[]> => {
    const result = await http.get<List[]>('/list');
    return result;
};

export const findListsAll = async (
): Promise<List[]> => {
    const result = await http.get<List[]>('/list/all');
    return result;
};

export const addCourseList = async (listId: string, courseId: string): Promise<List> => {
    const result = await http.post<List>(`/list/add/${listId}`, { courseId });
    return result;
};

export const findListById = async (id: string): Promise<List> => {
    const result = await http.get<List>(`/list/${id}`);
    return result;
};

export const updateList = async (id: string, dto: UpdateListDto): Promise<List> => {
    const result = await http.patch<List>(`/list/${id}`, dto);
    return result;
};

export const deleteList = async (id: string): Promise<void> => {
    await http.delete(`/list/${id}`);
};