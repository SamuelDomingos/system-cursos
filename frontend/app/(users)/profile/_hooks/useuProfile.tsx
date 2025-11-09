import { useState } from 'react';
import { updateUser } from '@/lib/api/users/users';
import { UpdateUserDto } from '@/lib/api/types/users';
import { toast } from 'sonner';

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProfile = async (id: string, data: UpdateUserDto) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateUser(id, data);
      toast.success('Perfil atualizado com sucesso!');
    } catch (err: any) {
      setError(err);
      toast.error('Erro ao atualizar o perfil.', {
        description: err.message || 'Tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
  };
};