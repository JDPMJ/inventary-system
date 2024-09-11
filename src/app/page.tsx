"use client"
import Index from "@/components/Index"
import { redirect } from "next/navigation"
import { useUserAuth } from "@/providers/UserAuthContext"

function page() {
  //const session = await getServerSession(authOptions)
  const {userAuth} = useUserAuth()

  return (
    <div className="container">
      <Index />
    </div>
  )
}

export default page