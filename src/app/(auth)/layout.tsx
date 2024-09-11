import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  //const session = await getServerSession(authOptions)

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
