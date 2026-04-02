import React from 'react'


import type { Metadata } from "next";
import MainTemplates from '@/templates/MainTemplates';
import Subbanner from '@/components/global/Subbanner';
import Gallerypage from '@/components/gallery/Gallerypage';
export const metadata: Metadata = {
  title:
    "",
    description:
    "",
};


const page = () => {
  return (
    <>
    
    <MainTemplates>
        <Subbanner heading='Media'/>
        <Gallerypage/>
    </MainTemplates>
    </>
  )
}

export default page