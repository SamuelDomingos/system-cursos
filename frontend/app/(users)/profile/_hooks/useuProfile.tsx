import { useFetch } from "@/hooks/useFetch";
import { updateUser } from "@/lib/api/users/users";

export const useProfile = () => {

  const {
    execute: updateProfile,
    isLoading,
    error,
  } = useFetch(updateUser, {
    successMessage: "Perfil atualizado com sucesso!",
    errorMessage: "Erro ao atualizar o perfil.",
  });

  return {
    updateProfile,
    isLoading,
    error,
  };
};
