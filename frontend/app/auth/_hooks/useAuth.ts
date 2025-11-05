'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, register } from "@/lib/api/auth/auth";
import { toast } from "sonner";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/app/auth/_schema/auth";

type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export function useAuth(type: "login" | "register") {
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = type === "login";
  const formSchema = isLogin ? loginSchema : registerSchema;

  const form = useForm<LoginRequest | RegisterRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: isLogin 
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", "confirm-password": "" },
  });

  const handleSubmit = async (values: LoginRequest | RegisterRequest) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        loginSchema.parse(values);
        await login(values as LoginRequest);
        toast.success("Login successful");
      } else {
        registerSchema.parse(values);
        await register(values as RegisterRequest);
        toast.success("Registration successful");
      }
    } catch (err: any) {
      const errorMessage = err instanceof z.ZodError 
        ? err.issues[0].message 
        : err.message || (isLogin ? "Login failed" : "Registration failed");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
  };
}