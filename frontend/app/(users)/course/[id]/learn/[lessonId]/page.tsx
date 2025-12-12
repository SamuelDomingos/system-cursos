"use client";

import { useState } from "react";
import { VideoPlayer } from "./_components/VideoPlayer";
import { DetailsCourse } from "./_components/DetailsCourse";
import { SidebarCourse } from "./_components/SidebarCourse";

export default function CoursePlayer() {

  const courseData = {
    title: "Os 3 Pilares que o Gestor de Tráfego Pago precisa Dominar!",
    rating: 4.5,
    students: 44001,
    totalHours: 26,
    lessons: 153,
    language: "Português",
    lastUpdate: "dezembro de 2025",
  };

  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        <VideoPlayer/>
        <DetailsCourse courseData={courseData}/>
      </div>

      {/* Sidebar - Course Content */}
      <SidebarCourse courseData={courseData}/>
    </div>
  );
}
