"use client";
import { useState } from "react";
import CourseForm from "./CourseForm";
import { IoMdAdd } from "react-icons/io";

const CourseHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold text-defined-black">
            Courses
          </h1>
          <button
            onClick={() => setOpen(true)}
            className="text-white bg-defined-red px-4 rounded-3xl"
          >
            <IoMdAdd className="inline text-2xl" />
            Add Course
          </button>{" "}
        </div>
        <p className="text-defined-brown">
          Manage your yoga programs and online training sessions
        </p>
      </div>
      {open && <CourseForm mode={null} course={null} closeModal={() => setOpen(false)} />}
    </>
  );
};

export default CourseHeader;
