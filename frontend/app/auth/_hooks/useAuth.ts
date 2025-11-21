import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, register } from "@/lib/api/auth/auth";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/app/auth/_schema/auth";
import { useFetch } from '@/hooks/useFetch';

type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export function useAuth(type: "login" | "register") {
  const isLogin = type === "login";
  const formSchema = isLogin ? loginSchema : registerSchema;

  const form = useForm<LoginRequest | RegisterRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", "confirm-password": "" },
  });

  const { execute: executeLogin, isLoading: isLoadingLogin } = useFetch(
    login,
    {
      successMessage: "Login successful",
      errorMessage: "Login failed",
    }
  );

  const { execute: executeRegister, isLoading: isLoadingRegister } = useFetch(
    register,
    {
      successMessage: "Registration successful",
      errorMessage: "Registration failed",
    }
  );

  const handleSubmit = async (values: LoginRequest | RegisterRequest) => {
    if (isLogin) {
      await executeLogin(values as LoginRequest);
    } else {
      await executeRegister(values as RegisterRequest);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: isLogin ? isLoadingLogin : isLoadingRegister,
  };
}