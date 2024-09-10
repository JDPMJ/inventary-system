"use client"
import { useUserAuth } from "@/providers/UserAuthContext"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { ChangeEvent, useState } from "react"

function SigninPage() {
  const {userAuth, signIn} = useUserAuth()

  const [signinForm, setSigninForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value })
  }

  const handleSignin = () => {
    redirect("http://localhost:3000/")
    
    //signIn("credentials", {email: signinForm.email, password: signinForm.password, redirect: true, callbackUrl: "/"})
  }

  return (
    <div className="container">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="card text-bg-light" style={{ width: "20rem" }}>
          <div className="card-body">
            <div>
              <div className="mb-3">
                <label htmlFor="email">Usuario</label>
                <input type="text" id="email" value={signinForm.email} name="email" className="form-control" placeholder="user@gmail.com..." onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Contraseña</label>
                <input type="text" id="password" value={signinForm.password} name="password" className="form-control" placeholder="123..." onChange={handleChange} />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={handleSignin}>Ingresar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninPage