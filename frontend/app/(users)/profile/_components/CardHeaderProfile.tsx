import { CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "../_hooks/useuProfile";
import { type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export const CardHeaderProfile = () => {
  const { updateProfile, isLoading, error } = useUpdateProfile();
  const { user } = useAuth();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile(user.id, { avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <CardHeader className="flex align-center items-left gap-2">
      <div className="relative group">
        <Avatar className="w-60 h-60">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="text-8xl">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div
          className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            document.getElementById("avatar-upload-input")?.click();
          }}
        >
          <Pencil className="w-10 h-10 text-white" />
          <span className="text-white text-sm mt-1">escolher foto</span>
        </div>
        <Input
          id="avatar-upload-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="mt-8">
        <p className="text-SM text-gray-500">perfil</p>
        <CardTitle className="text-7xl font-bold">{user?.name}</CardTitle>
      </div>
    </CardHeader>
  );
};
