"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface Auth {
  id: string
  name: string
  username: string
  password: string
  userType: string
  email: string
  status: string
  authenticate: boolean
}

export const AuthContext = createContext<{
  auth: Auth,
  isLogget: boolean,
  setIsLogget: Dispatch<SetStateAction<boolean>>,
  message: () => void
}>({
  auth: {
    id: "",
    name: "",
    username: "",
    password: "",
    userType: "",
    email: "",
    status: "",
    authenticate: false
  },
  isLogget: false,
  setIsLogget: () => {},
  message: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>({
    id: "",
    name: "",
    username: "",
    password: "",
    userType: "",
    email: "",
    status: "",
    authenticate: false
  })

  const [isLogget, setIsLogget] = useState(false)

  function message() {
    console.log("Ejecutando función")
  }

  return <AuthContext.Provider value={{ auth, isLogget, setIsLogget, message }}>
    {children}
  </AuthContext.Provider>
}