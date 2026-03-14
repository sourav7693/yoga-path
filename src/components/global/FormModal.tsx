"use client";
import {
  sendLeadOtp,
  verifyLeadOtp,
  getLeadEnrollments,
  enrollCourse,
  createPaymentOrder,
  verifyRazorpaySignature,
  completeEnrollment,
} from "@/actions/leads";
import { useEffect, useState, useActionState, startTransition } from "react";
import { toast } from "react-toastify";
import { CourseDoc } from "@/models/Course";

type SelectedCourse = {
  courseId: string;
  location?: string;
  remark?: string;
};

interface RazorpayWindow extends Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: () => void) => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    contact?: string;
    email?: string;
  };
  notes?: Record<string, string>;
  theme?: { color?: string };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// --- Utility: Load Razorpay SDK ---
async function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as unknown as RazorpayWindow).Razorpay) return resolve();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
}

export default function FormModal({
  onClose,
  courses,
}: {
  onClose: () => void;
  courses: CourseDoc[];
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
  const [otpState, otpAction, otpPending] = useActionState(sendLeadOtp, null);
  const [verifyState, verifyAction, verifyPending] = useActionState(
    verifyLeadOtp,
    null,
  );
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [enrollState, enrollAction, enrollPending] = useActionState(
    async (prev: any, formData: FormData) => {
      try {
        const courseId = formData.get("courseId") as string;
        const location = formData.get("location") as string;
        const remark = formData.get("remark") as string;
        const email = formData.get("email") as string;

        const res = await enrollCourse(prev, formData);

        if (!res.success) {
          toast.error(res.message);
          return;
        }

        setSelectedCourse({
          courseId,
          location,
          remark,
        } as any);

        setFormData((prev) => ({
          ...prev,
          email,
        }));

        setStep(3);
        toast.success(res.message);
        return;
      } catch (error) {
        console.log(error);
        toast.error("Failed to enroll");
        return;
      }
    },
    null,
  );
  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse | null>(
    null,
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  useEffect(() => {
    if (!otpState) return;

    if (!otpState.success) {
      toast.error(otpState.message);
      return;
    }

    if (otpState.alreadyRegistered) {
      toast.success(otpState.message);
      setStep(2);
      return;
    }

    if (otpState.otpSent) {
      toast.success(otpState.message);
      setOtpMode(true);
    }
  }, [otpState]);

  useEffect(() => {
    if (!verifyState) return;

    if (!verifyState.success) {
      toast.error(verifyState.message);
      return;
    }

    toast.success(verifyState.message);
    setStep(2);
  }, [verifyState]);

  useEffect(() => {
    if (step !== 2) return;

    async function loadEnrollments() {
      const res = await getLeadEnrollments(formData.mobile);

      if (res.success) {
        const ids = res.enrollments.map((e: any) => e.course.courseId);
        setEnrolledCourses(ids);
      }
    }

    loadEnrollments();
  }, [step]);

  const handlePayment = async () => {
    if (!selectedCourse) {
      toast.error("No course selected");
      return;
    }
    try {
      await loadRazorpayScript();
      const course = courses.find(
        (c) => c.courseId === selectedCourse?.courseId,
      );
      const orderFd = new FormData();
      orderFd.append("amount", String(course?.offerPrice || course?.courseMRP));

      const res = await createPaymentOrder(null, orderFd);

      if (!res.success) {
        toast.error(res.message || "Failed to create order");
        return;
      }

      const { order, key } = res;

      const options: RazorpayOptions = {
        key: key ? key : "",
        amount: Number(order?.amount),
        currency: "INR",
        name: "Yoga Path",
        description: "Course Enrollment",
        order_id: order ? order.id : "",

        handler: async (response) => {
          // --- Step 1: Verify Razorpay signature ---
          const verifyFd = new FormData();
          verifyFd.append("razorpay_order_id", response.razorpay_order_id);
          verifyFd.append("razorpay_payment_id", response.razorpay_payment_id);
          verifyFd.append("razorpay_signature", response.razorpay_signature);

          const verify = await verifyRazorpaySignature(null, verifyFd);

          if (!verify.success) {
            toast.error("Payment verification failed");
            return;
          }

          // --- Step 2: Complete enrollment ---
          const enrollFd = new FormData();
          enrollFd.append("mobile", formData.mobile);
          enrollFd.append("courseId", selectedCourse!.courseId);
          enrollFd.append("location", selectedCourse?.location || "");
          enrollFd.append("remark", selectedCourse?.remark || "");

          enrollFd.append("razorpay_order_id", response.razorpay_order_id);
          enrollFd.append("razorpay_payment_id", response.razorpay_payment_id);
          enrollFd.append("razorpay_signature", response.razorpay_signature);
          enrollFd.append(
            "amount",
            String(course?.offerPrice || course?.courseMRP),
          );

          const enroll = await completeEnrollment(null, enrollFd);

          if (enroll.success) {
            toast.success(enroll.message || "Enrollment successful");
            setStep(1);
            onClose();
          } else {
            toast.error(enroll.message || "Enrollment failed");
          }
        },

        //ts-ignore
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
            onClose();
          },
        },
        prefill: {
          name: formData.name,
          contact: formData.mobile,
        },

        theme: { color: "#b91c1c" },
      };

      const razorpay = new (window as unknown as RazorpayWindow).Razorpay(
        options,
      );
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  const inputClass =
    "w-full px-4 py-3 text-sm " +
    "text-white placeholder-white/70 " +
    "bg-white/10 backdrop-blur-md border border-white/30 " +
    "focus:outline-none focus:border-white/60 transition-all duration-300";

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md 
                 flex items-center justify-center 
                 z-[999] p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md 
                   rounded-2xl p-6 
                   bg-white/10 backdrop-blur-xl
                   border border-white/20 
                   shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 
                     text-white text-xl 
                     hover:scale-110 transition"
        >
          ✕
        </button>

        <h3 className="text-[17px] font-semibold text-white text-left">
          Lets Talk to Our Counsellors
        </h3>

        <h4 className="text-[14px] font-semibold text-white/80 text-left mb-4">
          Fill out the form below to get started!
        </h4>

        {step === 1 && (
          <form action={otpAction} className="space-y-3">
            <div className="rounded-[10px] overflow-hidden">
              <input
                type="text"
                name="name"
                disabled={otpMode}
                placeholder="Name"
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                required
                className={`${inputClass} rounded-tl-[10px] rounded-tr-[10px]`}
              />

              <input
                type="tel"
                name="mobile"
                disabled={otpMode}
                placeholder="Mobile Number"
                onChange={(e) =>
                  setFormData((p) => ({ ...p, mobile: e.target.value }))
                }
                required
                className={inputClass}
              />
              {otpMode && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  disabled={verifyPending}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`${inputClass} rounded-bl-[10px] rounded-br-[10px]`}
                />
              )}
            </div>
            {!otpMode ? (
              <button
                type="submit"
                disabled={otpPending}
                className="w-full bg-defined-red text-white
                         py-3 mt-2 rounded-md font-semibold
                         transition-all duration-300 hover:opacity-90"
              >
                {otpPending ? "Sending OTP..." : "Register Now"}
              </button>
            ) : (
              <button
                type="button"
                disabled={verifyPending}
                onClick={() => {
                  const fd = new FormData();
                  fd.append("mobile", formData.mobile);
                  fd.append("otp", otp);

                  startTransition(() => {
                    verifyAction(fd);
                  });
                }}
                className="w-full bg-defined-red text-white py-3 mt-2 rounded-md font-semibold
             transition-all duration-300 hover:opacity-90 disabled:opacity-60"
              >
                {verifyPending ? "Verifying..." : "Verify OTP"}
              </button>
            )}
          </form>
        )}

        {step === 2 && (
          <form action={enrollAction} className="space-y-3">
            <input type="hidden" name="mobile" value={formData.mobile} />
            <div className="rounded-[10px] overflow-hidden">
              <select
                name="courseId"
                required
                className={`${inputClass} rounded-tl-[10px] rounded-tr-[10px]`}
              >
                <option value="" disabled className="text-black">
                  Select Course
                </option>
                {courses.map((course: CourseDoc) => {
                  const enrolled = enrolledCourses.includes(course.courseId);

                  return (
                    <option
                      key={course.courseId}
                      value={course.courseId}
                      disabled={enrolled}
                      className={`text-black ${enrolled && "text-defined-brown"}`}
                    >
                      {course.courseName} {enrolled ? "(Enrolled)" : ""}
                    </option>
                  );
                })}
              </select>

              <input
                type="text"
                name="location"
                placeholder="Location"
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={inputClass}
              />

              <input
                type="text"
                name="remark"
                placeholder="Remark"
                className={`${inputClass} rounded-bl-[10px] rounded-br-[10px]`}
              />
            </div>

            <button
              type="submit"
              disabled={enrollPending}
              className="w-full bg-defined-red text-white
                         py-3 mt-2 rounded-md font-semibold
                         transition-all duration-300 hover:opacity-90"
            >
              {enrollPending ? "Enrolling..." : "Enroll Now"}
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-white text-sm">
              Complete payment to confirm enrollment
            </p>

            <button
              onClick={handlePayment}
              className="w-full bg-defined-red text-white py-3 rounded-md font-semibold"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
