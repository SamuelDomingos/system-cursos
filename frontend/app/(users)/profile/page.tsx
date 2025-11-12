"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CardHeaderProfile } from "./_components/CardHeaderProfile";

const ProfilePage = () => {

  return (
    <Card>
      <CardHeaderProfile/>
      <CardContent className="mt-4">
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
