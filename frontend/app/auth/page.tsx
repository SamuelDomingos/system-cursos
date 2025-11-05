"use client"

import { GalleryVerticalEnd } from "lucide-react"

import { AuthForm } from "@/app/auth/_components/authForm"
import { useState } from "react";

export default function AuthPage() {
    const [mode, setMode] = useState('login');

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {mode === 'login' ? (
              <AuthForm
                type="login"
                title="Login"
                description="Login to your account"
                buttonText="Login"
              />
            ) : (
              <AuthForm
                type="register"
                title="Register"
                description="Create a new account"
                buttonText="Register"
              />
            )}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="mt-4 text-sm text-muted-foreground underline"
            >
              {mode === 'login' ? 'Don’t have an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
