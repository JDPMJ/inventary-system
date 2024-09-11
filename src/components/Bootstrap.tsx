"use client"
import { useEffect } from "react"

function Bootstrap() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js")
  }, [])

  return (
    <></>
  )
}

export default Bootstrap