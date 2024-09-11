"use client"
import Index from "@/components/Index"
import { redirect } from "next/navigation"

function AuthPage() {

  return (
    <>
      <h1>AuthPage</h1>
    </>
  )
}

AuthPage.requireAuth = true

export default AuthPage