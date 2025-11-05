'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/app/auth/_hooks/useAuth";

interface AuthFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: "login" | "register";
  title: string;
  description: string;
  buttonText: string;
}

export function AuthForm({ 
  className, 
  type,
  title,
  description,
  buttonText,
  ...props 
}: AuthFormProps) {
  const { form, handleSubmit, isLoading } = useAuth(type);
  const isLogin = type === "login";

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {description}
          </p>
        </div>

        {!isLogin && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                {isLogin && (
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isLogin && (
          <FormField
            control={form.control}
            name="confirm-password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : buttonText}
        </Button>
      </form>
    </Form>
  );
}