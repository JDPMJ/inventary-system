"use client"
import Index from "@/components/Index"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

function AuthPage() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin")
    }
  })

  return (
    <>
      <div>{session?.data?.user?.email}</div>
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </>
  )
}

AuthPage.requireAuth = true

export default AuthPage