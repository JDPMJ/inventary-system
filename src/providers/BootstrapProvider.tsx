"use client"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"

const BootstrapProvider = ({ children }: ReactNode) => {
  
  return (
    <>
      {children}
    </>
  )
}

export default BootstrapProvider