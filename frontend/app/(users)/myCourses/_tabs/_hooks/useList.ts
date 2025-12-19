import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { addCourseList, createList, findListsAll, updateList } from "@/lib/api/list";
import { List } from "@/lib/api/types/list";
import { useMemo } from "react";

export const useList = (userId?: string, listId?: string) => {
    const isEditMode = !!listId;
    const defaultArgs = useMemo(() => [], []);

    const {
        data: lists,
        isLoading: isFetching,
        execute: refetch
    } = useFetch(findListsAll, {
        auto: true,
        defaultArgs,
        disableErrorMessage: true,
    });

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

    const addCourseMutation = useMutation(
        async ({ listId, courseId }: { listId: string; courseId: string }) => {
            const result = addCourseList(listId, courseId)
            return result;
        },
        {
            successMessage: "Curso adicionado à lista com sucesso!",
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
        refetch,

        addCourseMutation
    };
};
