import SingleCursorAll from "./_components/singleCursorAll";
import { useAuth } from "@/contexts/AuthContext";
import WeeklyProgressCard from "./_components/weeklyProgressCard";
import { useFetchCoursesByUser } from "./_hooks/useAllCourses";

const AllCourses = () => {
  const { user } = useAuth();
  const { courses, isLoading } = useFetchCoursesByUser(user?.id || "");

  return (
    <div>
      <WeeklyProgressCard />

      <h2 className="text-2xl font-bold mb-6 mt-8">Todos os cursos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {courses?.data?.map((item) => (
          <SingleCursorAll key={item.course.id} course={item} />
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
