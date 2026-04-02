import AboutSection from "@/components/home/AboutSection";
import HomeBanner from "@/components/home/Homebanner";
import MainTemplates from "@/templates/MainTemplates";
import  OurSucessStory from "@/components/home/OurSucessStory"
// import WhyChoose from "@/components/home/WhyChose";
import PrisingSection from "@/components/home/PricisingSection"
// import Testimonial from "@/components/home/Testimonial"
import { getAllCourses } from "@/actions/course";
import YogaCourses from "@/components/home/YogaCourses";
import { getReels } from "@/actions/reel";
import Guide from "@/components/home/Guide";
import SignatureOffering from "@/components/home/SignatureOffering";
import Highlights from "@/components/home/Highlights";
import Features from "@/components/home/Features";
import ImgContent from "@/components/home/ImgContent";
import MediationApp from "@/components/home/MediationApp";
import GallerySection from "@/components/gallery/GallerySection";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title:
    "Online Yoga Courses in North Bengal | The Yoga Path",
  description:
    "Join the best online yoga courses in North Bengal with The Yoga Path. Learn from expert trainers, flexible classes, and start your wellness journey from anywhere.",
};


export default async function Home() {
  const [courseResult, reelsResult] = await Promise.all([getAllCourses(1,6), getReels(1,0)]);  
  const courses = courseResult.data;
  const reels = reelsResult.data;
  return (
    <MainTemplates>
      <HomeBanner courses={courses}/>
      <AboutSection />
       <YogaCourses courses={courses} />
      <Guide/>
      <SignatureOffering/>
      <Highlights/>
      <Features/>
       <ImgContent/>
       <MediationApp/>
      <OurSucessStory reels={reels}/>
      <GallerySection/>
     
      {/* <WhyChoose /> */}
      <PrisingSection courses={courses}/>
      {/* <Testimonial /> */}
    </MainTemplates>
  );
}
