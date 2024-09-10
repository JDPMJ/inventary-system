import Index from "@/components/Index"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../../pages/api/auth/[...nextauth]"

async function page() {
  const session = await getServerSession(authOptions)

  return (
    <div className="container">
      {session != null ? <Index /> : redirect("/signin")}
    </div>
  )
}

export default page