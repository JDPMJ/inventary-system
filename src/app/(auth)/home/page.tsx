"use client"
import useAuthUser from "@/app/hooks/useAuthUser"
import Index from "@/components/Index"

function page() {
  useAuthUser()

  return (
    <>
      <Index />
    </>
  )
}

export default page