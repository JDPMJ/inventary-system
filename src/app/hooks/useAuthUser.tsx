"use client"
import { useEffect, useContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/config/firebase"
import { useRouter, usePathname } from "next/navigation"
import { AuthContext } from "../context/AuthContext"

function useAuthUser() {
  const {push} = useRouter()
  const pathname = usePathname()

  const {setIsLogget, loadUser} = useContext(AuthContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let userLogged = user === null ? false : true
      console.log(user?.email)
      if (!userLogged) {
        push("/signin")
        setIsLogget(false)
      } else {
        setIsLogget(true)
        loadUser(user!.uid!)
        if (pathname === "/signin") {
          push("/")
        }
      }
    })
  }, [])

  return (
    <div>useAuthUser</div>
  )
}

export default useAuthUser