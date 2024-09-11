"use client"
import { SessionProvider as Provider } from "next-auth/react"

function SessionProvider({ children }: ReactNode) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}

export default SessionProvider