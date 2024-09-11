"use client"
import { useContext, useEffect } from "react"
import ProductTable from "@/components/ProductTable"
import { AuthContext } from "@/app/context/AuthContext"
import useAuthUser from "@/app/hooks/useAuthUser"

function ProductsPage() {
  useAuthUser()
  const {isLogget} = useContext(AuthContext)

  useEffect(() => {
    console.log("isLogget: ", isLogget)
  }, [])

  return (
    <div className="container">
      <ProductTable />
    </div>
  )
}

export default ProductsPage