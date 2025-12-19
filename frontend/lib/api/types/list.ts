export type List = {
    id?: string;
    title: string;
    description: string;
    type: 'CUSTOM' | 'FAVORITES' | 'WATCH_LATER';
}

export type CreateListDto = {
    title: string;
    description: string;
    type: 'CUSTOM' | 'FAVORITES' | 'WATCH_LATER';
}

export type UpdateListDto = CreateListDto;