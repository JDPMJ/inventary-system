import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions)

  return (
    <>
      {session != null ? children : redirect("/signin")}
    </>
  )
}
