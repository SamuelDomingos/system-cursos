"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/app/(users)/profile/_hooks/useuProfile";

const ProfilePage = () => {
  const { user } = useAuth();
  const { updateProfile, isLoading, error } = useUpdateProfile();
  const [userName, setUserName] = useState(user?.name || "");

  return (
    <Card>
      <CardHeader className="flex align-center items-left gap-2">
        <div className="relative group">
          <Avatar className="w-60 h-60">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="text-8xl">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div
            className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex flex-col items-center justify-center cursor-pointer"
            onClick={() => {
              if (user) {
                updateProfile(user.id, { avatar: user.avatar });
              }
            }}
          >
            <Pencil className="w-10 h-10 text-white" />
            <span className="text-white text-sm mt-1">escolher foto</span>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-SM text-gray-500">perfil</p>
          <CardTitle className="text-7xl font-bold">{user?.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
