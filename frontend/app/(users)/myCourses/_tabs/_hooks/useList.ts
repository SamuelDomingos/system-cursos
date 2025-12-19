import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { createList, findAllList, updateList } from "@/lib/api/list";
import { List } from "@/lib/api/types/list";
import { useMemo } from "react";

export const useList = (userId?: string, listId?: string) => {
    const isEditMode = !!listId;
    const defaultArgs = useMemo(() => [], []);

    const {
        data: lists,
        isLoading: isFetching,
        execute: refetch
    } = useFetch(findAllList, {
        auto: true,
        defaultArgs,
        disableErrorMessage: true,
    });

    console.log(lists);

    const mutation = useMutation(
        async (data: List) => {
            if (isEditMode) {
                return updateList(listId!, data);
            }
            return createList(data);
        },
        {
            successMessage: isEditMode
                ? "Máquina atualizada com sucesso!"
                : "Máquina criada com sucesso!",
            onSuccess: () => {
                refetch();
            }
        }
    );

    return {
        onSubmit: mutation.mutate,
        isLoading: mutation.isLoading || isFetching,
        isEditMode,
        lists,
        refetch
    };
};
