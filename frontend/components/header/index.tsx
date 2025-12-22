"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Users,
  Search,
  Home,
  LogOut,
  UserCircle,
  ShoppingCart,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import CartDropdownContent from "../CartDropdownContent";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export const Header = () => {
  const { logout } = useAuth();
  const { cartCount } = useCart();
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
          href="/"
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
        <Link
          href="/myCourses"
          className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          My Courses
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <HoverCard openDelay={200} closeDelay={200}>
          <HoverCardTrigger asChild>
            <Button variant="outline" size="icon" className="relative h-8 w-8">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent align="end" className="p-0 w-80">
            <CartDropdownContent />
          </HoverCardContent>
        </HoverCard>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Users className="h-4 w-4" />
          <span className="sr-only">Friends</span>
        </Button>
        <HoverCard openDelay={200} closeDelay={200}>
          <HoverCardTrigger asChild>
            <Button variant="default" size="icon" className="rounded-full">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent align="end" className="w-40 p-1">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              Account
            </Link>
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
              Support
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
              Settings
            </div>
            <Separator className="my-1" />
            <Button
              variant="ghost"
              onClick={async () => {
                await logout();
              }}
              className="w-full justify-start flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </HoverCardContent>
        </HoverCard>
      </div>
    </header>
  );
};
