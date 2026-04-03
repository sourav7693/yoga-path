import ContactSection from '@/components/contact/ContacrSection'
import Subbanner from '@/components/global/Subbanner'
import MainTemplates from '@/templates/MainTemplates'
import React from 'react'


import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Contact The Yoga Path | Online Yoga Courses North Bengal",
  description:
    "Get in touch with The Yoga Path for online yoga courses in North Bengal. Contact us for course details, enrollment, or support for your yoga journey.",
};


const page = () => {
  return (
    <>
    <MainTemplates>
        <Subbanner heading='Contact Us'/>
        <ContactSection/>
    </MainTemplates>
    
    </>
  )
}

export default page