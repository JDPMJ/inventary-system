"use client"
import { createContext, useContext, useState } from "react"
import { db } from "@/config/firebase"
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { redirect } from "next/navigation"

interface UserAuth {
  id: string
  name: string
  username: string
  password: string
  userType: string
  email: string
  status: string
  authenticate: boolean
}

export const UserAuthContext = createContext<{
  userAuth: UserAuth
  signIn: (username: string, password: string) => Promise<any>
}>({
  userAuth: {
    id: "",
    name: "",
    username: "",
    password: "",
    userType: "",
    email: "",
    status: "",
    authenticate: false
  },
  signIn: async (username: string, password: string) => {}
})

export const useUserAuth = () => {
  const context = useContext(UserAuthContext)
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider")
  }
  return context
}

export const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, setUserAuth] = useState<UserAuth>({
    id: "",
    name: "",
    username: "",
    password: "",
    userType: "",
    email: "",
    status: "",
    authenticate: false
  })

  async function signIn(username: string, password: string) {
    const res = await getDocs(query(collection(db, "users"), where("username", "==", username)))
    const data = res.docs.map((user) => Object({id: user.id, ...user.data()}))
    //console.log("Información: ", data[0].password)
    if (password == data[0].password) {
      setUserAuth({ ...userAuth, authenticate: true })
    }
  }

  function signOut() {
    setUserAuth({ ...userAuth, authenticate: false })
  }

  return <UserAuthContext.Provider value={{ userAuth, signIn }}>
    {children}
  </UserAuthContext.Provider>
}