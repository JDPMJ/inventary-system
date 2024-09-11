import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import BootstrapProvider from "@/providers/BootstrapProvider"
import Navbar from "@/components/Navbar"
import { UserProvider } from "@/app/context/UserContext"
import { ProductProvider } from "@/app/context/ProductContext"
import { Toaster } from "react-hot-toast"
import "bootstrap/dist/css/bootstrap.min.css"
import Bootstrap from "@/components/Bootstrap"
import { AuthProvider } from "./context/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Inventary System",
  description: "Sistema de inventario web",
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  //const session = await getServerSession(authOptions)

  return (
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
            <html lang="es">
              <body className={inter.className}>
                <Toaster />
                <Bootstrap />
                {children}
              </body>
            </html>
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  )

  /*return (
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
  )*/
}
