"use client"
import { useUser } from "@/providers/UserContext"
import { ChangeEvent, useEffect } from "react"
import { Col, Form, Row } from "react-bootstrap"
import toast from "react-hot-toast"
import AddEditUserDialog from "./AddEditUserDialog"
import { deleteUser as firebaseDeleteUser, getAuth } from "firebase/auth"

/*interface User {
  name: string
  username: string
  password: string
  userType: string
  email: string
  status: string
}*/

function UserTable() {
  const {users, loadUsers, deleteUser} = useUser()
  
  const handleClick = async (id: string) => {
    try {
      /*const deleteAuth = getAuth()
      const userAuth = deleteAuth.currentUser
      console.log(userAuth)
      await firebaseDeleteUser(userAuth!).then().catch()*/
      await deleteUser(id)
      toast.success("Usuario eliminado exitosamente")
    } catch (error) {
      console.log(error)
      toast.error("Problema al intertar eliminar el usuario: " + error)
    }
  }

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      await loadUsers(e.target.value)
    } catch (error) {
      console.log(error)
      toast.error("Problema al intertar buscar el usuario: " + error)
    }
  }
  
  useEffect(() => {
    loadUsers("")
  }, [])

  return (
    <div className="container">
      <div className="mt-5">
        <div className="mb-3">
          <Row>
            <Col><Form.Control type="text" placeholder="Buscar usuario" onChange={handleSearch} /></Col>
            <Col><AddEditUserDialog variant="add" /></Col>
          </Row>
        </div>
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Nombre de Usuario</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Tipo de Usuario</th>
              <th scope="col">Correo</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} className="">
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.user_type}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>
                    <button className="btn btn-danger mx-2" onClick={() => handleClick(user.id)}>Eliminar</button>
                    <AddEditUserDialog variant="edit" user={user} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTable