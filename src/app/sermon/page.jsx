import React from 'react'
import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import VideosLayer from "@/components/VideosLayer";

function page() {
  return (
    <>
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Sermon' />
        <VideosLayer />
      </MasterLayout>
    </>
  )
}

export default page