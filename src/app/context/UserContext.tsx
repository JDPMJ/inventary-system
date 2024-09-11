"use client"
import { createContext, useContext, useState } from "react"
import { db } from "@/config/firebase"
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"

interface User {
  id?: string
  name: string
  username: string
  password: string
  userType: string
  email: string
  status: string
}

export const UserContext = createContext<{
  users: any[]
  addUser: (user: User) => Promise<void>
  loadUser: (id: string) => Promise<void>
  loadUsers: (name: string) => Promise<void>
  editUser: (user: User) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  userBackup: () => Promise<any>
}>({
  users: [],
  addUser: async (user: User) => {},
  loadUser: async (id: string) => {},
  loadUsers: async (name: string) => {},
  editUser: async (user: User) => {},
  deleteUser: async (id: string) => {},
  userBackup: async () => {}
})

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<any[]>([])

  async function loadUsers(name: string) {
    const res = await getDocs(collection(db, "users"))
    const data = res.docs.map((user) => Object({id: user.id, ...user.data()}))
    if (name == "") {
      setUsers(data)
      console.log(data)
    } else {
      const exp = new RegExp(`${name}.*`, "i")
      const filteredData = data.filter(user => exp.test(user.name))
      setUsers(filteredData)
    }
  }

  async function loadUser(id: string) {
    const data = await getDoc(doc(db, "users", id))
    setUsers([{ id: id, ...data.data() }])
    console.log(data)
  }

  async function addUser(user: User) {
    const newIdUser = doc(collection(db, "users"))
    await setDoc(newIdUser, {
      name: user.name,
      username: user.username,
      password: user.password,
      user_type: user.userType,
      email: user.email,
      status: user.status
    })
    loadUsers("")
  }

  async function deleteUser(id: string) {
    const res = await deleteDoc(doc(db, "users", id))
    console.log(res)
    loadUsers("")
  }

  async function editUser(user: User) {
    const res = await setDoc(doc(db, "users", user.id!), {
      name: user.name,
      username: user.username,
      password: user.password,
      user_type: user.userType,
      email: user.email,
      status: user.status
    })
    console.log(res)
    loadUsers("")
  }

  async function userBackup() {
    const res = await getDocs(collection(db, "users"))
    const data = res.docs.map((user) => Object({id: user.id, ...user.data()}))
    return data
  }

  return <UserContext.Provider value={{ users, addUser, loadUser, loadUsers, editUser, deleteUser, userBackup }}>
    {children}
  </UserContext.Provider>
}