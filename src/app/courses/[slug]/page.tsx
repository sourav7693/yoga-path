import AboutJoinSection from "@/components/course/AboutJoinSection";
import BenefitsSection from "@/components/course/BenefitsSection";
import CTASection from "@/components/course/CTASection";
import CustomerStories from "@/components/course/CustomerStories";
import FAQSection from "@/components/course/FAQSection";
import MordernSection from "@/components/course/MordernSection";
import StepsSection from "@/components/course/StepsSection";
import Subbanner from "@/components/global/Subbanner";
import BetterSleep from "@/components/SvgIcon/BetterSleep";
import DynamicFlexibility from "@/components/SvgIcon/DynamicFlexibility";
import ImproveFlexibility from "@/components/SvgIcon/ImproveFlexibility";
import IncreaseEnergy from "@/components/SvgIcon/IncreaseEnergy";
import ReduceStress from "@/components/SvgIcon/ReduceStress";
import RoutineBuilding from "@/components/SvgIcon/RoutineBuilding";
import StressRelief from "@/components/SvgIcon/StressRelief";
import MainTemplates from "@/templates/MainTemplates";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FaRegClock } from "react-icons/fa";
import { FiActivity, FiBriefcase, FiHome, FiUser } from "react-icons/fi";
import { LuAlarmClock, LuDoorOpen } from "react-icons/lu";
import { TbVideoPlus } from "react-icons/tb";
import { getAllCourses, getCourseBySlug } from "@/actions/course";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}



function formatDuration(days: string, meetingDuration: string): string {
  const daysLabel = days
    .replace(/(\d+)(months?)/, "$1 Months")
    .replace(/(\d+)(days?)/, "$1 Days")
    .replace(/(\d+)(weeks?)/, "$1 Weeks");

  const durationLabel = meetingDuration
    .replace(/(\d+)(min)/, "$1 min")
    .replace(/(\d+)(hour)/, "$1 hour")
    .replace(/(\d+)(hr)/, "$1 hr");

  return `${daysLabel} · ${durationLabel} / day`;
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCourseBySlug(slug);

  if (!result.success || !result.data) {
    return {
      title: "Course Not Found",
      description: "",
    };
  }

  const course = result.data;

  return {
    title: course.metaTitle || course.courseName,
    description: course.metaDescription || course.description,
  };
}

const CoursesPage = async ({ params }: CoursePageProps) => {
  const { slug } = await params;

  const result = await getCourseBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const course = result.data;

  const allCoursesRes = await getAllCourses();
const allCourses = allCoursesRes.data;


  const faqData = {
    heading: "Frequently Asked Questions",
    faqs: (course.faqs ?? []).map((f: { question: string; answer: string }) => ({
      question: f.question,
      answer: f.answer,
    })),
  };

  function formatBatchTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

  const stats = [
{
  iconType: <LuAlarmClock size={28} />,
  label: "Duration",
  value: formatDuration(course.days, course.meetingDuration),
},
{
  iconType: <TbVideoPlus size={28} />,
  label: "Type",
  value: "Live Online",
},
{
  iconType: <LuDoorOpen size={28} />,
  label: "Platform",
  value: "Google Meet",
},
{
  iconType: <FaRegClock size={28} />,
  label: "Batches",
  value: `${formatBatchTime(course.startDate)}`,
},
  ];

  const aboutData = {
    image: course.thumbnail?.secure_url ?? "/assets/new-img/courseabout.png",
    title: course.courseName,
    description: course.description,
      courseId: course.courseId,
      offerPrice:course.offerPrice,
  courses: allCourses,
    whoJoin: [
      {
        icon: <FiUser />,
        title: "Beginners",
        desc: "No prior experience needed. We start from the basics.",
      },
      {
        icon: <FiBriefcase />,
        title: "Professionals",
        desc: "Fix posture and de-stress after long hours of work.",
      },
      {
        icon: <FiHome />,
        title: "Homemakers",
        desc: "Rejuvenate your energy and find time for yourself.",
      },
      {
        icon: <FiActivity />,
        title: "Seniors",
        desc: "Gentle movements tailored for mobility and joint health.",
      },
    ],
  };

  const practiceSectionData = {
    heading: "A Practice for Modern Living",
    subheading: "Rooted in ancient tradition, designed for your busy schedule.",
    cards: [
      {
        iconType: <DynamicFlexibility />,
        iconBg: "bg-[#BAECBC]",
        title: "Dynamic Flexibility",
        description:
          "Increase your range of motion and reduce muscle stiffness through targeted flow sequences.",
      },
      {
        iconType: <StressRelief />,
        iconBg: "bg-[#F2DAFF]",
        title: "Stress Relief",
        description:
          "Modern mindfulness techniques to calm the nervous system and clear mental clutter.",
      },
      {
        iconType: <RoutineBuilding />,
        iconBg: "bg-[#BAECBC]",
        title: "Routine Building",
        description:
          "Establish a sustainable daily habit that fits seamlessly into your lifestyle.",
      },
    ],
  };

  const stepsData = {
    heading: "Simple Steps to Start",
    steps: [
      {
        title: 'Click "Book Now"',
        description:
          "Select your preferred start date and batch time from our simple booking portal.",
      },
      {
        title: "Complete Booking/Payment",
        description:
          "Secure your spot with our 100% encrypted payment gateway.",
      },
      {
        title: "WhatsApp Confirmation",
        description:
          "Receive an instant confirmation and personalized welcome message on WhatsApp.",
      },
      {
        title: "Get Google Meet Link",
        description:
          "Class links are shared 15 minutes before every session directly to your phone.",
      },
      {
        title: "Join Live Class",
        description:
          "Roll out your mat, click the link, and begin your transformation.",
      },
    ],
  };

  const benefitsData = {
    items: [
      {
        icon: <ReduceStress />,
        title: "Reduce Stress",
        description: "Calm the mental storm and find your inner peace.",
        bg: "bg-[#DFF5E3]",
      },
      {
        icon: <IncreaseEnergy />,
        title: "Increase Energy",
        description: "Wake up feeling refreshed and ready for the day.",
        bg: "bg-[#F1E6FF]",
      },
      {
        icon: <ImproveFlexibility />,
        title: "Improve Flexibility",
        description: "Open up your body and move with newfound ease.",
        bg: "bg-[#DFF5E3]",
      },
      {
        icon: <BetterSleep />,
        title: "Better Sleep",
        description: "Deep, restorative rest through evening wind-downs.",
        bg: "bg-[#F1E6FF]",
      },
    ],
  };

  const ctaSection ={
       courseId: course.courseId,
  courses: allCourses,
  }


  return (
    <MainTemplates>
      <Subbanner heading={course.courseName} />
      <AboutJoinSection data={aboutData} />
      <MordernSection
        practiceSectionData={practiceSectionData}
        stats={stats}
      />
      <StepsSection stepsData={stepsData} />
      <BenefitsSection benefitsData={benefitsData} />
      <CTASection data={ctaSection} />
      {/* <CustomerStories data={storiesData} /> */}
      <FAQSection data={faqData} />
    </MainTemplates>
  );
};

export default CoursesPage;