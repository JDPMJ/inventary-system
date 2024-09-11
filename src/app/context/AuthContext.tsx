"use client"
import { db } from "@/config/firebase"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface Auth {
  id: string
  name: string
  username: string
  password: string
  user_type: string
  email: string
  status: string
}

export const AuthContext = createContext<{
  auth: Auth,
  isLogget: boolean,
  setIsLogget: Dispatch<SetStateAction<boolean>>,
  loadUser: (id: string) => Promise<void>
}>({
  auth: {
    id: "",
    name: "",
    username: "",
    password: "",
    user_type: "",
    email: "",
    status: ""
  },
  isLogget: false,
  setIsLogget: () => {},
  loadUser: async (id: string) => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>({
    id: "",
    name: "",
    username: "",
    password: "",
    user_type: "",
    email: "",
    status: ""
  })

  const [isLogget, setIsLogget] = useState(false)

  async function loadUser(id: string) {
    const data = await getDoc(doc(db, "users", id))
    setAuth({
      id: id,
      name: data.data()?.name,
      username: data.data()?.username,
      password: data.data()?.password,
      user_type: data.data()?.user_type,
      email: data.data()?.email,
      status: data.data()?.status
    })
    console.log(data)
  }

  return <AuthContext.Provider value={{ auth, isLogget, setIsLogget, loadUser }}>
    {children}
  </AuthContext.Provider>
}