"use client"
import React from 'react'
import { Toaster } from 'react-hot-toast'
import DownloadBackup from './DownloadBackup'
import UploadBackup from './UploadBackup'
import index from "./../assets/images/index.png"
import { signOut as firebaseSigninOut } from "firebase/auth"
import { auth } from '@/config/firebase'

function Navbar() {
  //const session = useSession()

  const handleUserOptions = () => {
    firebaseSigninOut(auth)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:3000">Inventary System</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="http://localhost:3000/products">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/users">Usuarios</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Herramientas</a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item" href="#">Respaldo</a>
                    <ul className="dropdown-menu submenu dropdown-menu-dark">
                      <li><DownloadBackup /></li>
                      <li><UploadBackup /></li>
                    </ul>
                  </li>
                  {/*<li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                </ul>
              </li>
            </ul>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={index.src} style={{ width: 40, marginRight: "10px" }} />
                {/*session?.data?.user?.email*/}
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                <li><button className="dropdown-item" onClick={handleUserOptions}>Cerrar sesión</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar