"use client"
import useAuthUser from "@/app/hooks/useAuthUser"
import UserTable from "@/components/UserTable"

function UsersPage() {
  useAuthUser()

  return (
    <div className="container">
      <UserTable />
    </div>
  )
}

export default UsersPage