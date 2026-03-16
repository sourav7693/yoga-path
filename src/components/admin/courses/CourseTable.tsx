"use client";

import { useState } from "react";
import { CourseDoc } from "@/models/Course";
import { FaEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import CourseForm from "./CourseForm";
import { deleteCourse } from "@/actions/course";
import { toast } from "react-toastify";

export default function CourseTable({ courses }: { courses: CourseDoc[] }) {
  const [mode, setMode] = useState<"view" | "edit" | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseDoc | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<CourseDoc | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDelete = (course: CourseDoc) => {
    setCourseToDelete(course);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!courseToDelete) return;

    setIsDeleting(true);

    const result = await deleteCourse(courseToDelete.courseId);

    if (result.success) {
      toast.success(result.message);
      setDeleteModal(false);
    } else {
      toast.error(result.message);
    }

    setIsDeleting(false);
  };

  const openView = (course: CourseDoc) => {
    setMode("view");
    setSelectedCourse(course);
  };

  const openEdit = (course: CourseDoc) => {
    setMode("edit");
    setSelectedCourse(course);
  };

  return (
    <>
      <div className="bg-[#F8FAFC] rounded-xl shadow h-[calc(100vh-400px)] overflow-y-scroll no-scrollbar">
        <table className="w-full">
          <thead className="h-16 bg-gray-200">
            <tr>
              <th>Course</th>
              <th>Category</th>
              <th>Standard Price</th>
              <th>Offer Price</th>
              <th>Students Enrolled</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                key={course.courseId}
                className="border-b border-gray-200 text-center last:border-none bg-gray-100"
              >
                <td className="p-3 text-lg font-semibold">{course.courseName}</td>

                <td>{course.category}</td>

                <td className="line-through text-defined-brown">
                  ₹{course.courseMRP}
                </td>

                <td className="text-defined-red font-bold">
                  ₹{course.offerPrice}
                </td>

                <td>{course.students?.length || 0}</td>
                <td>{course.status}</td>

                <td>{course.days}</td>

                <td>
                  <span className="flex items-center justify-center gap-4">
                    <FaEye
                      onClick={() => openView(course)}
                      className="cursor-pointer text-defined-blue"
                    />

                    <FiEdit3
                      onClick={() => openEdit(course)}
                      className="cursor-pointer text-defined-blue"
                    />

                    <MdDelete
                      onClick={() => openDelete(course)}
                      className="cursor-pointer text-defined-red"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mode && (
        <CourseForm
          mode={mode}
          course={selectedCourse}
          closeModal={() => setMode(null)}
        />
      )}

      {deleteModal && courseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-100 shadow-lg">
            <h2 className="text-xl font-bold text-defined-black mb-2">
              Delete Course
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{courseToDelete.courseName}</span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 border rounded-2xl bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-2xl"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
