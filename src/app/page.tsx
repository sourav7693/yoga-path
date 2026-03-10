import AboutSection from "@/components/home/AboutSection";
import HomeBanner from "@/components/home/Homebanner";
import MainTemplates from "@/templates/MainTemplates";
import  OurSucessStory from "@/components/home/OurSucessStory"
import WhyChoose from "@/components/home/WhyChose";
import PrisingSection from "@/components/home/PricisingSection"
import Testimonial from "@/components/home/Testimonial"
import { getAllCourses } from "@/actions/course";
import YogaCourses from "@/components/home/YogaCourses";

export default async function Home() {
  const courses = (await getAllCourses(1,6)).data;
  return (
    <MainTemplates>
      <HomeBanner />
      <AboutSection />
      <OurSucessStory />
      <YogaCourses courses={courses} />
      <WhyChoose />
      <PrisingSection courses={courses}/>
      <Testimonial />
    </MainTemplates>
  );
}
