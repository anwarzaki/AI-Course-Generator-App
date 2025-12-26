"use client";
import React, { useEffect, useState } from "react";
import { and, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
import { CourseList } from "../../../../../configs/schema";
import { db } from "../../../../../configs/db";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { FaCopy } from "react-icons/fa6";

const Finish = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  // const router = useRouter();

  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setCourseId(resolvedParams?.courseId);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (courseId && user) {
      GetCourse(courseId);
    }
  }, [courseId, user]);

  const GetCourse = async (id) => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, id),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0]);
      console.log("Result is:", result);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">Congrats! your course is ready</h2>
     <CourseBasicInfo course={course} refreshData={()=>console.log("hanji")}/>
      <h2 className="py-3">Course URL:</h2>
      
      <h2 className="text-center text-gray-500 p-2 rounded flex justify-between">{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
      <FaCopy className="h-5 w-5 cursor-pointer"
      onClick={async()=>await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`)}/>
      </h2>
    </div>
  );
};

export default Finish;
