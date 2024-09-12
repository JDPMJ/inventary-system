"use client"
import { useUser } from "@/app/context/UserContext"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import toast from "react-hot-toast"
import AddEditUserDialog from "./AddEditUserDialog"
import { AuthContext } from "@/app/context/AuthContext"

/*interface User {
  name: string
  username: string
  password: string
  userType: string
  email: string
  status: string
}*/

function UserTable() {
  const {auth, isLogget} = useContext(AuthContext)
  const {users, loadUsers, deleteUser} = useUser()
  const [userData, setUserData] = useState<any>([])
  
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
    console.log("isLogget en userTable: ", auth)
    loadUsers("")
    const userTable = users.map((user) => ({
      name: user.name,
      username: user.username,
      password: user.password,
      user_type: user.user_type,
      email: user.email,
      status: user.status
    }))
    setUserData(userTable)
  }, [auth])

  return (
    <div className="container">
      <div className="mt-5">
        <div className="mb-3">
          <Row>
            <Col><Form.Control type="text" placeholder="Buscar usuario" onChange={handleSearch} /></Col>
            <Col>{auth.user_type == "Administrador" && <AddEditUserDialog variant="add" />}</Col>
          </Row>
        </div>
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Nombre de Usuario</th>
              {auth.user_type == "Administrador" && <th scope="col">Contraseña</th>}
              <th scope="col">Tipo de Usuario</th>
              <th scope="col">Correo</th>
              <th scope="col">Estado</th>
              {auth.user_type == "Administrador" && <th scope="col">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} className="">
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  {auth.user_type == "Administrador" && <td>{user.password}</td>}
                  <td>{user.user_type}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  {auth.user_type == "Administrador" && <td>
                    <button className="btn btn-danger mx-2" onClick={() => handleClick(user.id)}>Eliminar</button>
                    <AddEditUserDialog variant="edit" user={user} />
                  </td>}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>{users.length} usuarios</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default UserTable