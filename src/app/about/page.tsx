import Subbanner from '@/components/global/Subbanner'
import AboutSection from '@/components/home/AboutSection'
import Guide from '@/components/home/Guide'
import MainTemplates from '@/templates/MainTemplates'
import React from 'react'

import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "About The Yoga Path | Online Yoga Courses in North Bengal",
  description:
    "Learn about The Yoga Path, a Siliguri-based platform offering online yoga courses in North Bengal. Discover our mission, expert mentors, and holistic wellness approach.",
};

const page = () => {
  return (
    <>
    <MainTemplates>
        <Subbanner heading='About Us'/>
        <AboutSection/>
        <Guide/>
    </MainTemplates>
    
    
    </>
  )
}

export default page