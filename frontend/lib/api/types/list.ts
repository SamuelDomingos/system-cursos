import { Course } from "./courses";

export type List = {
    id?: string;
    title: string;
    description: string;
    type: 'CUSTOM' | 'FAVORITES' | 'WATCH_LATER';
    listCourses: {
        course: {
            id: string;
            title: string;
        };
    }[];
}

export type ListAll = {
    id?: string;
    title: string;
    description: string;
    type: 'CUSTOM' | 'FAVORITES' | 'WATCH_LATER';
    listCourses: {
        course: Course[];
    };
}

export type CreateListDto = {
    title: string;
    description: string;
    type: 'CUSTOM' | 'FAVORITES' | 'WATCH_LATER';
}

export type UpdateListDto = CreateListDto;