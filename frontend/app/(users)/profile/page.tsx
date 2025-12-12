"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CardHeaderProfile } from "./_components/CardHeaderProfile";
import AllCourses from "../myCourses/_tabs/allCourses";

const ProfilePage = () => {

  return (
    <Card>
      <CardHeaderProfile/>
      <CardContent className="mt-4">
        <AllCourses/>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
