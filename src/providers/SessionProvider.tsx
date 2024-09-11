"use client"
import { SessionProvider as Provider } from "/react"

function SessionProvider({ children }: ReactNode) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}

export default SessionProvider