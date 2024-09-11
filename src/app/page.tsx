"use client"
import Index from "@/components/Index"
import { redirect } from "next/navigation"
import { useUserAuth } from "@/app/context/UserAuthContext"
import useAuthUser from "./hooks/useAuthUser"
import { useContext, useEffect } from "react"
import { AuthContext } from "./context/AuthContext"

function page() {
  //const session = await getServerSession(authOptions)
  useAuthUser()
  const {isLogget} = useContext(AuthContext)

  useEffect(() => {
    console.log("isLogget: ", isLogget)
  }, [])

  return (
    redirect("/home")
  )
}

export default page