
import React from "react";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import FixFooter from "@/components/global/FixFooter";
import { getAllCourses } from "@/actions/course";

const MainTemplates = async ({ children } : {
  children: React.ReactNode;
}) => {
   const courses = (await getAllCourses()).data;
  return (
    <div className="flex w-full h-full flex-col overflow-x-hidden">
      <div className="z-[1000] w-full">
        <Header />
      </div>

      <div className="lg:mt-[5rem] md:mt-[5rem] mt-[2rem]">{children}</div>
      <Footer />
      <FixFooter courses = {courses}/>
    </div>
  );
};

export default MainTemplates;
