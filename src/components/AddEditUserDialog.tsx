"use client"
import { auth } from "@/config/firebase"
import { useUser } from "@/app/context/UserContext"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ChangeEvent, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import toast from "react-hot-toast"

interface Props {
  variant: string
  user?: {
    id: string
    name: string
    username: string
    password: string
    user_type: string
    email: string
    status: string
  }
}

function AddEditUserDialog({ variant, user }: Props) {
  const {addUser, editUser} = useUser()

  const [userForm, setUserForm] = useState({
    name: "",
    username: "",
    password: "",
    userType: "",
    email: "",
    status: ""
  })

  const [renderUserModal, setRenderUserModal] = useState(false)
  const [showModalUser, setShowModalUser] = useState(false)
  const [checkboxStatus, setCheckboxStatus] = useState(false)
  const handleShowModalUser = () => {
    setRenderUserModal(true)
    setShowModalUser(true)
  }
  const handleCloseModalUser = () => {
    setShowModalUser(false)
    setTimeout(() => setRenderUserModal(false), 300)
  }
  const [modalTitle, setModalTitle] = useState("")
  const [buttonName, setButtonName] = useState("")
  const [buttonStyle, setButtonStyle] = useState("")

  const [topping, setTopping] = useState("")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "userType") {
      if (e.target.id == "admin") {
        setUserForm({ ...userForm, userType: "Administrador" })
        setTopping(e.target.value)
      } else if (e.target.id == "user") {
        setUserForm({ ...userForm, userType: "Usuario" })
        setTopping(e.target.value)
      }
    } else if (e.target.name == "status") {
      if (e.target.checked) {
        setUserForm({ ...userForm, status: "Activo" })
      } else {
        setUserForm({ ...userForm, status: "Inactivo" })
      }
      setCheckboxStatus(e.target.checked)
    } else {
      setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }
  }

  /*const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await addUser({
        id: "",
        name: userForm.name,
        username: userForm.username,
        password: userForm.password,
        userType: userForm.userType,
        email: userForm.email,
        status: userForm.status
      })
      toast.success("Usuario agregado exitosamente")
      setUserForm({
        name: "",
        username: "",
        password: "",
        userType: "",
        email: "",
        status: ""
      })
      document.getElementById("closeUserModal")?.click()
    } catch (error) {
      console.log(error)
      toast.error("Problema al intertar regitrar el usuario: " + error)
    }
  }*/

  const onClickHandler = async () => {
    if (variant == "add") {
      try {
        const dataUser = await createUserWithEmailAndPassword(auth, userForm.email, userForm.password).then((userAuth) => {
          return userAuth
        })
        console.log(dataUser.user.uid)
        await editUser({
          id: dataUser.user.uid,
          name: userForm.name,
          username: userForm.username,
          password: userForm.password,
          userType: userForm.userType,
          email: userForm.email,
          status: userForm.status
        })
        toast.success("Usuario agregado exitosamente")
        setUserForm({
          name: "",
          username: "",
          password: "",
          userType: "",
          email: "",
          status: ""
        })
        handleCloseModalUser()
      } catch (error) {
        console.log(error)
        toast.error("Problema al intertar regitrar el usuario: " + error)
      }
    } else {
      try {
        await editUser({
          id: user!.id,
          name: userForm.name,
          username: userForm.username,
          password: userForm.password,
          userType: userForm.userType,
          email: userForm.email,
          status: userForm.status
        })
        toast.success("Usuario editado exitosamente")
        setUserForm({
          name: "",
          username: "",
          password: "",
          userType: "",
          email: "",
          status: ""
        })
        handleCloseModalUser()
      } catch (error) {
        console.log(error)
        toast.error("Problema al intertar editar el usuario: " + error)
      }
    }
  }

  const initState = () => {
    if (variant == "add") {
      setModalTitle("Agregar Usuario")
      setButtonName("Agregar")
      setButtonStyle("primary")
      setTopping("")
      setCheckboxStatus(false)
    } else {
      setModalTitle("Editar Usuario")
      setButtonName("Editar")
      setButtonStyle("warning")

      setUserForm({
        name: user!.name,
        username: user!.username,
        password: user!.password,
        userType: user!.user_type,
        email: user!.email,
        status: user!.status
      })

      if (user!.user_type == "Administrador") {
        setTopping("admin")
      } else if (user!.user_type == "Usuario") {
        setTopping("user")
      }

      if (user!.status == "Activo") {
        setCheckboxStatus(true)
      } else {
        setCheckboxStatus(false)
      }
      console.log("Renderizando")
    }
  }

  useEffect(() => {
    initState()
  }, [renderUserModal])

  return (
    <>
      <Button variant={buttonStyle} onClick={handleShowModalUser}>{buttonName}</Button>
      {renderUserModal &&
        <div>
          <Modal show={showModalUser} onHide={handleCloseModalUser}>
            <Modal.Header closeButton>
              <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="">
                <div className="mb-3">
                  <label htmlFor="name">Nombre</label>
                  <input type="text" id="name" value={userForm.name} name="name" className="form-control" placeholder="Ingrese el nombre completo" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Nombre de Usuario</label>
                  <input type="text" id="username" value={userForm.username} name="username" className="form-control" placeholder="Ingrese un nombre de usuario" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Contraseña</label>
                  <input type="text" id="password" value={userForm.password} name="password" className="form-control" placeholder="Ingrese una contraseña" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="userType">Tipo de Usuario</label>
                  <div className="form-check">
                    <input className="form-check-input" value="admin" checked={topping === "admin"} type="radio" name="userType" id="admin" onChange={onChangeHandler} />
                    <label className="form-check-label" htmlFor="admin">Administrador</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" value="user" checked={topping === "user"} type="radio" name="userType" id="user" onChange={onChangeHandler} />
                    <label className="form-check-label" htmlFor="user">Usuario</label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Correo</label>
                  <input type="text" id="email" value={userForm.email} name="email" className="form-control" placeholder="Ingrese su dirección de email" onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="status">Estado</label>
                  <div className="form-check">
                    <input className="form-check-input" checked={checkboxStatus} type="checkbox" name="status" id="status" onChange={onChangeHandler} />
                    <label className="form-check-label" htmlFor="status">Activo</label>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModalUser}>Cerrar</Button>
              <Button variant={buttonStyle} onClick={onClickHandler}>{buttonName}</Button>
            </Modal.Footer>
          </Modal>
        </div>
      }
    </>
  )
}

export default AddEditUserDialog