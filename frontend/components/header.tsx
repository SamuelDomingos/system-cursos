"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Users, Search, Home, LogOut, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [hasBackground, setHasBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasBackground(true);
      } else {
        setHasBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/auth");
  };

  return (
    <header
      className={`sticky top-0 z-30 flex h-20 items-center gap-4 border-b py-2 sm:h-auto sm:border-0 sm:px-8 transition-all duration-300 ${
        hasBackground
          ? "bg-background/80 backdrop-blur-sm border-b"
          : "border-b-transparent"
      }`}
    >
      <div className="flex items-center gap-2">
        <Link
          href="/home"
          className="flex items-center justify-center cursor-pointer"
        >
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <Home className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="relative flex-1 mx-auto max-w-md flex items-center justify-center">
        <div className="relative w-full ml-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Users className="h-4 w-4" />
          <span className="sr-only">Friends</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="icon" className="rounded-full">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href="/profile">
              <DropdownMenuItem>Account</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
