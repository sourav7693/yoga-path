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
import { IoMdArrowRoundBack } from "react-icons/io";
import { allowOnlyNumbers, blockNumbersInText } from "@/helper/inputHandlers";
import { useRouter } from "next/navigation";



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
  mode = "modal",
}: {
  onClose?: () => void;
  courses: CourseDoc[];
  mode: "modal" | "inline";
}) {
  const router = useRouter();
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
  if (!onClose) return; // inline form, no modal behaviour

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
  if (mode === "modal") {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }
}, [mode]);

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
         router.push("/payment-error?reason=order-failed");
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
            router.push(
              `/payment-error?reason=verification-failed&paymentId=${response.razorpay_payment_id}`,
            );
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
            router.push(
              `/thank-you?paymentId=${response.razorpay_payment_id}`,
            );
          } else {
            router.push(
              `/payment-error?reason=enrollment-failed&paymentId=${response.razorpay_payment_id}`,
            );
          }
        },

        //ts-ignore
        modal: {
          ondismiss: () => {
            router.push("/payment-error?reason=cancelled");
            onClose?.();
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
     router.push("/payment-error?reason=exception");
    }
  };

  const inputClass =
    "w-full px-4 py-3 text-sm " +
    "text-white placeholder-white/70 " +
    "bg-white/10 backdrop-blur-md border border-white/30 " +
    "focus:outline-none focus:border-white/60 transition-all duration-300";

  return (
    <div
      className={
        mode === "modal"
          ? "fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-999 p-4 w-full"
          : "relative w-full"
      }
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md
  rounded-2xl p-6
  border flex flex-col gap-2 shadow-2xl
  ${
    mode === "modal"
      ? "bg-white/10 backdrop-blur-xl border-white/20"
      : "bg-black/50 backdrop-blur-xl border-gray-200"
  }`}
        onClick={(e) => e.stopPropagation()}
      >
        {mode === "modal" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 
                     text-white text-xl 
                     hover:scale-110 transition"
          >
            ✕
          </button>
        )}

        <h3 className="text-[17px] font-semibold text-white text-left flex items-center gap-2">
          {step > 1 && (
            <button onClick={() => {
  if (step === 2) setStep(1);
  if (step === 3) setStep(2);
}}>
              <IoMdArrowRoundBack className="text-xl hover:scale-110 transition" />
            </button>
          )}
          Lets Talk to Our Counsellors
        </h3>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mt-3">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full
        text-sm font-semibold transition-all duration-300
        ${
          step >= s
            ? "bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.8)]"
            : "bg-white/20 text-white/60"
        }`}
              >
                {s}
              </div>

              {i < 2 && (
                <div
                  className={`w-10 h-[2px] ${
                    step > s ? "bg-green-500" : "bg-white/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-white/60 mb-3">
          Step {step} of 3
        </p>

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
                value={formData.name}
                onKeyDown={blockNumbersInText}
                placeholder="Name"
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                required
                className={`${inputClass} rounded-tl-[10px] rounded-tr-[10px]`}
              />

              <input
                type="text" // Use "text" for maxLength to work reliably
  minLength={10}
  maxLength={10}
                name="mobile"
                value={formData.mobile}
                onKeyDown={allowOnlyNumbers}
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
                  onKeyDown={allowOnlyNumbers}
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
                required
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
