import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import BootstrapProvider from "@/providers/BootstrapProvider"
import Navbar from "@/components/Navbar"
import { UserProvider } from "@/providers/UserContext"
import { ProductProvider } from "@/providers/ProductContext"
import SessionProvider from "@/providers/SessionProvider"
import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Inventary System",
  description: "Sistema de inventario web",
}

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions)

  return (
    <SessionProvider>
      <UserProvider>
        <ProductProvider>
          <BootstrapProvider>
            <html lang="es">
              <body className={inter.className}>
                <Toaster />
                {session &&
                  <Navbar />
                }
                {children}
              </body>
            </html>
          </BootstrapProvider>
        </ProductProvider>
      </UserProvider>
    </SessionProvider>
  )
}
