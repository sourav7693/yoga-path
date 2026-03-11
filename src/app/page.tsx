import AboutSection from "@/components/home/AboutSection";
import HomeBanner from "@/components/home/Homebanner";
import MainTemplates from "@/templates/MainTemplates";
import  OurSucessStory from "@/components/home/OurSucessStory"
import WhyChoose from "@/components/home/WhyChose";
import PrisingSection from "@/components/home/PricisingSection"
import Testimonial from "@/components/home/Testimonial"
import { getAllCourses } from "@/actions/course";
import YogaCourses from "@/components/home/YogaCourses";
import { getReels } from "@/actions/reel";

export default async function Home() {
  const [courseResult, reelsResult] = await Promise.all([getAllCourses(1,6), getReels(1,0)]);  
  const courses = courseResult.data;
  const reels = reelsResult.data;
  return (
    <MainTemplates>
      <HomeBanner />
      <AboutSection />
      <OurSucessStory reels={reels}/>
      <YogaCourses courses={courses} />
      <WhyChoose />
      <PrisingSection courses={courses}/>
      <Testimonial />
    </MainTemplates>
  );
}
