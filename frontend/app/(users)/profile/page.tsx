"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <Card>
      <CardHeader className="flex align-center items-left gap-2">
        <div className="relative group">
          <Avatar className="w-60 h-60">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex flex-col items-center justify-center cursor-pointer">
            <Pencil className="w-10 h-10 text-white" />
            <span className="text-white text-sm mt-1">escolher foto</span>
          </div>
        </div>
        <div>
          <p className="text-SM text-gray-500">perfil</p>
          <CardTitle className="text-7xl font-bold">{user?.name}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProfilePage;
